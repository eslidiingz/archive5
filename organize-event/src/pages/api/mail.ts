import { iEvent } from '@/interfaces/event.interface';
import { GET_EVENT } from '@/models/cms/event';
import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next'

const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL_CMS
})

type Data = {
  success: boolean,
  message: string
}

const sendEmailUri: any = process.env.NEXT_PUBLIC_SEND_EMAIL_URI;
const emailKey: any = process.env.NEXT_PUBLIC_EMAIL_API_KEY;

export enum eEmailTemplate {
  VERIFLY_ORG = "VERIFLY_ORG",
  CONFIRM_ORG = "CONFIRM_ORG",
  REGISTER_USER = "REGISTER_USER",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if ( req.method !== 'POST' ) res.status(405)

  const { mailTo, template, username, event_uid } = req?.body;
  const event = await getEventDetail(event_uid)
  
  if ( event ) {
    const { template:bodyContent, subject} = getTemplate(template, username, event)

    const paramsSendMail = {
      to: [mailTo],
      cc: [""],
      subject: subject,
      body: bodyContent,
    };

    let isSent = false;
  
    try {
      const { data: send } = await axios.post(sendEmailUri, paramsSendMail, {
        headers: {
          "X-API-KEY": emailKey,
        },
      });
  
      if (send?.status == "ok") {
        isSent = true;
        console.log(
          "%c[SUCCESS] ====================> Sent Notification\r\n",
          "color:lime;"
        );
  
        res.status(200).json({ success: isSent, message: "Email has been sent." })
      }
  
    } catch (err) {
      console.log("%c%s", "background: #008cff; color: #000000", "🚀 ~ file: mail.ts:38 ~ err:", err)
      
      res.status(500).json({ success: false, message: "Connot send email" })
    }
  } else {
    res.status(500).json({ success: false, message: "Event not found." })
  }
}


const getTemplate = (_slug: string, _username: string, _event: iEvent) => {

  const template = templateRegister(_username, _event)
  const subject = `Your ticket for event with ${_event?.name}`

  return { template, subject };
}


const templateRegister = (_username: string, _event: iEvent) => {
  return `
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 40px">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#111638" align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="center" valign="top" style="padding: 40px 10px 40px 10px">
                <a href="http://umbraco.com" target="_blank">
                  <img
                    alt="Logo"
                    src="https://apisix-gateway.bigbangtheory.io/files/statics/logo.png"
                    style="display: block; width: 200px; max-width: 200px; min-width: 200px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px"
                    border="0"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- HERO -->
      <tr>
        <td bgcolor="#111638" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  color: #000000;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 36px;
                  font-weight: 900;
                  line-height: 48px;
                  border-radius: 10px 10px 0px 0px;
                "
              >
                <h1 style="font-size: 36px; font-weight: 900; margin: 0">Hi! ${_username}</h1>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="center">
                <img
                  alt="Logo"
                  src="https://apisix-gateway.bigbangtheory.io/files/statics/logo-register.png"
                  style="display: block; width: 200px; max-width: 200px; min-width: 200px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px"
                  border="0"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td bgcolor="#F3F3F5" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 40px 30px;
                  color: #303033;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 1.6em;
                  text-align: center;
                  border-radius: 0px 0px 10px 10px;
                "
              >
                <p>
                  ขณะนี้คุณได้ลงทะเทียนงานอีเวนต์ ${_event?.name} เรียบร้อยแล้วค่ะ
                </p>

                <div style="border: 1.5px solid #d2d5da; box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.18); border-radius: 5px; position: relative; cursor: pointer">
                  <div style="width: 100%; height: 300px; overflow: hidden">
                    <img src="${_event?.image_url}" style="width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%" />
                  </div>
                  <div style="padding: 20px">
                    <p style="font-weight: 700 !important">${_event?.name}</p>
                    <p style="font-size: 12px; font-weight: 500; color: #c4c4c4">
                      ${_event?.description}
                    </p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem">
                      <div style="display: flex; align-items: center;">
                        <i class="far fa-calendar ci-textddetail"></i>
                        <p class="ms-2 mb-0 modal-select-choice ci-textddetail">Event start: ${dayjs(_event?.start_at).format('DD MMM,YYYY HH:mm')}</p>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="far fa-user-friends ci-textddetail"></i>
                        <p class="ms-2 mb-0 modal-select-choice ci-textddetail">&nbsp;</p>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="${process.env.NEXT_PUBLIC_MULTIPLAYER_URL}/?eventroom=${_event?.uid}" target="_blank"
                  style="
                    background-color: #366fd4;
                    margin: 30px;
                    color: #fff;
                    padding: 10px 30px;
                    border-radius: 30px;
                    border: 1px solid #041da5;
                    box-shadow: rgb(118 118 118 / 62%) 0px 2px 7px 0px;
                    cursor: pointer;
                    display: inline-block;
                  "
                >
                  คลิกเพื่อเข้าใช้งาน
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#F3F3F5" align="center" style="padding: 30px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td
                bgcolor="#111638"
                align="center"
                style="padding: 30px 30px 30px 30px; color: #ffffff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px"
              >
                <img alt="Logo" src="https://apisix-gateway.bigbangtheory.io/files/statics/logo.png" style="display: block; width: 100px; max-width: 100px; min-width: 100px" border="0" />
              </td>
              <td
                bgcolor="#111638"
                align="center"
                style="padding: 30px 30px 30px 30px; color: #ffffff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; line-height: 18px"
              >
                Thanawat Building 1st floor, 20/99 No.9 Soi Ngamwongwan 6, Yaek 3, Bangkhen, Mueang, Nonthaburi, 11000 Thailand
                <p style="color: #c4c4c4; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 200; line-height: 18px">
                  All rights reserved 2022 © Bigbang Theory Co.,Ltd
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `
}

const getEventDetail = async (_event_uid: string) => {
  const { data } = await gqlClient.query({
      query: GET_EVENT,
      variables: {
        uid: _event_uid
      }
  })

  if ( data?.eventByuid ) return data.eventByuid
}

