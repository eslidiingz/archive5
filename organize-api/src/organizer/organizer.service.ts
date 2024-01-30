import { Injectable } from "@nestjs/common";
import { CreateOrganizerInput } from "./dto/create-organizer.input";
import { UpdateOrganizerInput } from "./dto/update-organizer.input";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";
import { JwtService } from "@nestjs/jwt";
import { Organizer } from "./entities/organizer.entity";
import * as bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { CreateStaffInput } from "./dto/create-staff.input";

@Injectable()
export class OrganizerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async isValidEmail(email: string): Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async isValidPhoneNumber(phoneNumber: string) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  async isValidate(data: CreateOrganizerInput): Promise<boolean> {
    if (
      data?.name !== "" &&
      data?.lastname !== "" &&
      data?.email &&
      data?.phone_number !== "" &&
      data?.username !== "" &&
      data?.password !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  async create(createOrganizerInput: CreateOrganizerInput) {
    const username = createOrganizerInput.username.toLowerCase()
    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(createOrganizerInput.password, salt);

    const checkValidate = await this.isValidate(createOrganizerInput);
    const CheckFormatEmail = await this.isValidEmail(
      createOrganizerInput.email
    );
    const CheckFormatTel = await this.isValidPhoneNumber(
      createOrganizerInput.phone_number
    );
    const CheckUsername = await this.findUsername(
      username
    );

    if (!checkValidate) throw new Error("data is invalid");
    if (!CheckFormatEmail) throw new Error("email is invalid");
    if (!CheckFormatTel) throw new Error("phoneNumber is invalid");
    if (!CheckUsername) throw new Error("username has been used");

    const input: Prisma.OrganizersCreateInput = {
      uuid: uuid(),
      organize_uid: uuid(),
      verse_uid: createOrganizerInput.verse_uid,
      name: createOrganizerInput.name,
      lastname: createOrganizerInput.lastname,
      phone_number: createOrganizerInput.phone_number,
      email: createOrganizerInput.email,
      username: username,
      password: hash,
      city: createOrganizerInput.city,
      country: createOrganizerInput.country,
      organization_address: createOrganizerInput.organization_address,
      organization_name: createOrganizerInput.organization_name,
      package_uid: createOrganizerInput.package_uid,
    };

    const _resultCreate = await this.prisma.organizers.create({
      data: input,
    });
    return _resultCreate;
  }

  async validateOrganizer(username: string, password: string) {
    const _result = await this.prisma.organizers.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (_result) {
      return _result;
    } else {
      return null;
    }
  }

  async createStaff(createStaff: CreateStaffInput, admin_uid: string) {
    const _organizeInformation = await this.findOrganizeDetail(admin_uid);
    if (_organizeInformation) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(createStaff.password, salt);
      const input = {
        uuid: uuid(),
        name: createStaff?.name,
        lastname: createStaff?.lastname,
        username: createStaff?.username.toLowerCase(),
        password: hash,
        organize_uid: _organizeInformation?.organize_uid,
        phone_number: createStaff?.phone_number,
        email: createStaff?.email,
        role: createStaff?.role,
        verse_uid: _organizeInformation?.verse_uid,
        city: _organizeInformation?.city,
        country: _organizeInformation.country,
        organization_address: _organizeInformation.organization_address,
        organization_name: _organizeInformation.organization_name,
        cms_access_token: _organizeInformation?.cms_access_token,
        package_uid: _organizeInformation?.package_uid,
      };

      const _resultCreate = await this.prisma.organizers.create({
        data: input,
      });
      return _resultCreate;
    } else {
      throw new Error("Organize is Null");
    }
  }

  async findAllStaff(organize_uid: string) {
    const _result = await this.prisma.organizers.findMany({
      where: {
        organize_uid: organize_uid,
      },
    });
    return _result;
  }

  async findOrganizeDetail(uid: string) {
    const _result = await this.prisma.organizers.findFirst({
      where: {
        uuid: uid,
      },
    });

    return _result;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    return await this.prisma.organizers.findMany({});
  }

  async findUsername(username: string): Promise<boolean> {
    const _findUser = await this.prisma.organizers.findFirst({
      where: {
        username: username,
      },
    });

    if (_findUser) {
      return false;
    } else {
      return true;
    }
  }

  async findOne(username: string): Promise<Organizer | undefined> {
    return await this.prisma.organizers.findFirst({
      where: {
        username: username,
      },
    });
  }

  async findOrganizer(uid: string) {
    const _result = await this.prisma.organizers.findFirst({
      where: {
        uuid: uid,
      },
    });

    return _result;
  }

  async update(updateOrganizerInput: UpdateOrganizerInput) {
    // Check if the organizer exists
    const organizer = await this.prisma.organizers.findFirst({
      where: {
        uuid: updateOrganizerInput.uuid,
      },
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    // Perform the update based on the provided input
    const input: Prisma.OrganizersUpdateInput = {
      name: updateOrganizerInput.name,
      lastname: updateOrganizerInput.lastname,
      phone_number: updateOrganizerInput.phone_number,
      email: updateOrganizerInput.email,
      city: updateOrganizerInput.city,
      country: updateOrganizerInput.country,
      organization_address: updateOrganizerInput.organization_address,
      organization_name: updateOrganizerInput.organization_name,
      package_uid: updateOrganizerInput.package_uid,
      updated_at: new Date(), // Set the updated_at field to the current timestamp
    };

    // Update the organizer
    const updatedOrganizer = await this.prisma.organizers.update({
      where: {
        uuid: updateOrganizerInput.uuid,
      },
      data: input,
    });

    return updatedOrganizer;
  }

  async updateIsActive(updateOrganizerInput: UpdateOrganizerInput) {
    // Check if the organizer exists
    const organizer = await this.prisma.organizers.findFirst({
      where: {
        uuid: updateOrganizerInput.uuid,
      },
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    // Toggle the `is_active` field
    const input: Prisma.OrganizersUpdateInput = {
      is_active: !organizer.is_active,
      updated_at: new Date(), // Set the updated_at field to the current timestamp
    };

    // Update the organizer
    const updatedOrganizer = await this.prisma.organizers.update({
      where: {
        uuid: updateOrganizerInput.uuid,
      },
      data: input,
    });

    return updatedOrganizer;
  }

  async updateToken(organize_uid: string, token: string) {
    const input = {
      cms_access_token: token,
    };

    const _result = await this.prisma.organizers.update({
      where: {
        uuid: organize_uid,
      },
      data: input,
    });

    return _result;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }

  async findOrganizerPackage(uid: string) {
    const _user = await this.prisma.organizers.findFirst({
      where: {
        uuid: uid,
        is_active: true,
      },
    });
    const _package = await this.prisma.masterPackage.findFirst({
      where: {
        uuid: _user.package_uid,
      },
      include: {
        packageList: true,
      },
    });

    return {
      package: _package,
    };
  }
}
