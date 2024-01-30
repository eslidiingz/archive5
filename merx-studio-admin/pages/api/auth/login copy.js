// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcrypt from "bcryptjs";
import { getAdmins } from "/models/Admin";

export default async function login(req, res) {
  let response = { status: false, message: "" };

  if (req.method !== "POST") {
    res.status(400).json({
      status: false,
      message: "Method no allowed.",
    });
  }

  let admin = await getAdmins(`{username: {_eq: "${req.body.username}"}}`);

  if (admin.data.length < 1) {
    response.message = "Username not found.";
  } else {
    const isAuthenSuccess = await bcrypt.compare(
      req.body.password,
      admin.data[0].password
    );

    if (isAuthenSuccess) {
      response = {
        status: true,
        message: "Authenticated is success.",
        auth: admin.data[0],
      };
    } else {
      response.message = "Password invalid.";
    }
  }

  res.status(200).json(response);
}
