import { Injectable } from "@nestjs/common";
import { CreateRegisterFormInput } from "./dto/create-register_form.input";
import { UpdateRegisterFormInput } from "./dto/update-register_form.input";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";
import { GraphQLClient, gql } from "graphql-request";
import * as moment from "moment";

@Injectable()
export class RegisterFormService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRegisterFormInput: CreateRegisterFormInput) {
    const input = { ...createRegisterFormInput, uuid: uuid() };

    const _result = await this.prisma.registerForm.create({
      data: input,
    });
    return _result;
  }

  async findAll() {
    return await this.prisma.registerForm.findMany({});
  }

  async findregisterFormByEventUidAndFormType(
    event_uid: string,
    form_type: string
  ) {
    const _result = await this.prisma.registerForm.findMany({
      where: {
        event_uid: event_uid,
        form_type: form_type,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
        answer: true,
      },
    });

    return _result;
  }

  async findregisterFormByEventUid(event_uid: string) {
    return await this.prisma.registerForm.findMany({
      where: {
        event_uid: event_uid,
      },
      include: {
        questions: true,
        answer: true,
      },
    });
  }

  async SummaryRegister(organize_uid: string) {
    try {
      const client = new GraphQLClient(`${process.env.CMS_GRAPHQL}`);
      const query = gql`
        query Query($refUid: String!) {
          eventByRefUid(ref_uid: $refUid) {
            id
            uid
            name
            description
            image_url
            room_event_uid
            verse_uid
            ref_type
            ref_uid
            room_link
            json_url
            is_active
            start_at
            expired_at
            created_at
            updated_at
            deleted_at
          }
        }
      `;

      const variables = { refUid: organize_uid };
      const data: any = await client.request(query, variables);
      const _TotalUserRegister = await Promise.all(
        data.eventByRefUid.map(async (dataEvent: any) => {
          const _count = await this.userRegisterEvent(dataEvent.uid);
          return _count;
        })
      );
      const sumRegister = _TotalUserRegister.reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      return {
        total_register: sumRegister,
        total_ticket: 0,
        total_event: data?.eventByRefUid?.length,
        total_revenue: 0,
        average_event: 0,
        average_register: 0,
        average_revenue: 0,
        average_ticket: 0,
      };
    } catch (error) {
      return {
        total_register: 0,
        total_ticket: 0,
        total_event: 0,
        total_revenue: 0,
        average_event: 0,
        average_register: 0,
        average_revenue: 0,
        average_ticket: 0,
      };
    }
  }

  async getPostsBetweenDates(startDate: string, endDate: string) {
    const rawQuery: any = `SELECT count(id) as total FROM register_form WHERE form_type='register' AND created_at BETWEEN '${startDate}' AND '${endDate}'`;
    const result = await this.prisma.$queryRawUnsafe(rawQuery);
    return result[0];
  }

  async getAnswerBetweenDate(startDate: string, endDate: string) {
    const rawQuery: any = `SELECT count(id) as total FROM register_form WHERE created_at BETWEEN '${startDate}' AND '${endDate}' AND form_type='register'`;
    const result = await this.prisma.$queryRawUnsafe(rawQuery);
    return result[0];
  }

  async findOne(uid: string) {
    return await this.prisma.registerForm.findFirst({
      where: {
        uuid: uid,
      },
      include: {
        questions: true,
        answer: true,
      },
    });
  }

  async getDayName(date: Date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  async getDateInWeek() {
    const today = new Date(); // Current date and time
    const daysInWeek = 7; // Total number of days in a week
    const dateArray = [];
    // Loop to get dates for the next 7 days
    for (let i = 0; i < daysInWeek; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dateArray.push(date);
    }
    return dateArray;
  }

  async update(id: number, updateRegisterFormInput: UpdateRegisterFormInput) {
    const input = { ...updateRegisterFormInput };
    return await this.prisma.registerForm.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    const registerForm = await this.prisma.registerForm.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    });

    if (!registerForm) {
      throw new Error("Register form not found.");
    }

    if (registerForm.questions.length > 0) {
      for (const question of registerForm.questions) {
        if (question.answer.length > 0) {
          await this.prisma.answer.deleteMany({
            where: {
              form_uid: registerForm.uuid,
            },
          });
        }

        await this.prisma.questionForm.deleteMany({
          where: {
            form_uid: registerForm.uuid,
          },
        });
      }
    }

    return await this.prisma.registerForm.delete({
      where: {
        id: id,
      },
    });
  }

  async getPostsBetweenDateByEventUID(
    event_uid: string,
    startDate: string,
    endDate: string
  ) {
    const rawQuery: any = `SELECT count(id) as total FROM register_form WHERE event_uid = '${event_uid}' AND created_at BETWEEN '${startDate}' AND '${endDate}' AND form_type=''register`;
    const result = await this.prisma.$queryRawUnsafe(rawQuery);

    console.log(result);
    return result[0];
  }

  async SummaryRegisterWeekBy(event_uid: string) {
    const _form = await this.prisma.registerForm.findFirst({
      where: {
        event_uid: event_uid,
        form_type: "register",
      },
      orderBy: {
        id: "desc",
      },
    });

    const _countQuestion = await this.countQuestion(_form.uuid);

    const countDay = await this.countUserAnswerByWeek(
      _form.uuid,
      _countQuestion
    );

    return countDay;
  }

  async SummaryCardboadByEvent(event_uid: string) {
    try {
      const _countRegister = await this.userRegisterEvent(event_uid);

      return {
        total_register: Math.ceil(_countRegister),
        total_ticket: 0,
        total_view: Math.ceil(_countRegister),
        total_revenue: 0,
      };
    } catch (error) {
      return {
        total_register: 0,
        total_ticket: 0,
        total_view: 0,
        total_revenue: 0,
      };
    }
  }

  async userRegisterEvent(event_uid: string) {
    const _form = await this.prisma.registerForm.findFirst({
      where: {
        event_uid: event_uid,
        form_type: "register",
      },
      orderBy: {
        id: "desc",
      },
    });
    const countQuestion = await this.prisma.questionForm.count({
      where: {
        form_uid: _form.uuid,
      },
    });
    const _answer = await this.prisma.answer.count({
      where: {
        form_uid: _form.uuid,
      },
    });
    const userTotal = _answer / countQuestion;

    return Math.ceil(userTotal);
  }

  async ReportUserRegisterByEvent(event_uid: string) {
    const _form = await this.prisma.registerForm.findFirst({
      where: {
        event_uid: event_uid,
        form_type: "register",
      },
      orderBy: {
        id: "desc",
      },
    });

    const _headTable = await this.prisma.questionForm.findMany({
      where: {
        form_uid: _form.uuid,
      },
    });

    const report = await Promise.all(
      _headTable?.map(async (headerItem: any) => {
        const _answer = await this.prisma.answer.findMany({
          where: {
            question_uid: headerItem?.uuid,
          },
        });

        return {
          header: headerItem?.name,
          data: _answer,
        };
      })
    );

    return report;
  }

  async ReportUserRegisterAllInWeek(organize_uid: string) {
    try {
      const client = new GraphQLClient(`${process.env.CMS_GRAPHQL}`);
      const query = gql`
        query Query($refUid: String!) {
          eventByRefUid(ref_uid: $refUid) {
            id
            uid
            name
            description
            image_url
            room_event_uid
            verse_uid
            ref_type
            ref_uid
            room_link
            json_url
            is_active
            start_at
            expired_at
            created_at
            updated_at
            deleted_at
          }
        }
      `;

      const variables = { refUid: organize_uid };
      const data: any = await client.request(query, variables);
      const _ListFormRegister = await Promise.all(
        data.eventByRefUid.map(async (dataEvent: any) => {
          const _form = await this.prisma.registerForm.findFirst({
            where: {
              event_uid: dataEvent.uid,
              form_type: "register",
            },
            orderBy: {
              id: "desc",
            },
          });

          return _form;
        })
      );

      const _countUserResiterList = await Promise.all(
        _ListFormRegister.map(async (i) => {
          const _countQuestion = await this.countQuestion(i.uuid);
          const countAnswer = await this.countUserAnswerByWeek(
            i.uuid,
            _countQuestion
          );
          return countAnswer;
        })
      );

      const week = await this.getDateInWeek();

      const SummaryWeek = await Promise.all(
        week.map(async (day) => {
          const nameDay = await this.getDayName(day);
          const flatData = _countUserResiterList.flatMap(
            (innerArray) => innerArray
          );

          const filteredData = flatData.filter(
            (register: any) => register.day == nameDay
          );
          const sumOfAges = filteredData.reduce(
            (sum: any, register: any) => sum + register.count,
            0
          );

          return {
            day: nameDay,
            count: sumOfAges,
          };
        })
      );

      return SummaryWeek;
    } catch (error) {
      return [
        { day: "Sunday", count: 0 },
        { day: "Monday", count: 0 },
        { day: "Tuesday", count: 0 },
        { day: "Wednesday", count: 0 },
        { day: "Thursday", count: 0 },
        { day: "Friday", count: 0 },
        { day: "Saturday", count: 0 },
      ];
    }
  }

  async countQuestion(form_uid: string) {
    const _resultCountQuestion = await this.prisma.questionForm.count({
      where: {
        form_uid: form_uid,
      },
    });

    return _resultCountQuestion;
  }

  async countUserAnswerByWeek(form_uid: string, question_count: number) {
    const week = await this.getDateInWeek();
    const countArray = await Promise.all(
      week.map(async (day) => {
        const dayStart = moment(day).format("YYYY-MM-DD 00:00:00");
        const dayEnd = moment(day).format("YYYY-MM-DD 23:59:59");
        const nameDay = await this.getDayName(day);
        const rawQuery: any = `SELECT count(id) as total FROM answer WHERE form_uid = '${form_uid}' AND created_at BETWEEN '${dayStart}' AND '${dayEnd}'`;
        const result = await this.prisma.$queryRawUnsafe(rawQuery);
        return {
          day: nameDay,
          count: Math.ceil(parseInt(result[0].total) / question_count),
        };
      })
    );

    return countArray;
  }

  async top4Report(type: string, organize_uid: string) {
    const client = new GraphQLClient(`${process.env.CMS_GRAPHQL}`);
    const query = gql`
      query Query($refUid: String!) {
        eventByRefUid(ref_uid: $refUid) {
          id
          uid
          name
          description
          image_url
          room_event_uid
          verse_uid
          ref_type
          ref_uid
          room_link
          json_url
          is_active
          start_at
          expired_at
          created_at
          updated_at
          deleted_at
        }
      }
    `;

    const variables = { refUid: organize_uid };
    const data: any = await client.request(query, variables);

    if (type == "top_event") {
      try {
        const TopEvent = await Promise.all(
          data.eventByRefUid.map(async (dataEvent: any) => {
            const rawQueryQuestion: any = `SELECT "count"(question_form.id) as total FROM register_form
            INNER JOIN question_form ON question_form.form_uid= register_form.uuid
            WHERE register_form.event_uid='${dataEvent.uid}' AND register_form.form_type='register'`;
            const countQuestion = await this.prisma.$queryRawUnsafe(
              rawQueryQuestion
            );

            const rawQuery: any = `SELECT "count"(answer.id) as total FROM register_form
            INNER JOIN answer ON answer.form_uid= register_form.uuid
            WHERE register_form.event_uid='${dataEvent.uid}' AND register_form.form_type='register'`;
            const result = await this.prisma.$queryRawUnsafe(rawQuery);
            const _result =
              parseInt(result[0].total) / parseInt(countQuestion[0].total);

            return {
              event_name: dataEvent.name,
              amount: Math.ceil(_result),
            };
          })
        );

        return TopEvent;
      } catch (error) {
        return {
          event_name: "",
          amount: 0,
        };
      }
    }
  }
}
