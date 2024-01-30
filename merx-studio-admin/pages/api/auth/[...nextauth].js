import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdmins } from "/models/Admin";

// import { gqlQuery, gqlMutation } from "db/gql";

const secret = process.env.NEXTAUTH_SECRET;

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      id: "Merx",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // let admin = (
        //   await getAdmins(`{username: {_eq: "${credentials.username}"}}`)
        // ).data;

        return {
          name: credentials.username,
          email: credentials.username,
          iat: new Date().getTime(),
          exp: new Date().getTime() + 84000,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      token.userRole = "admin";
      return token;
    },

    async session({ session, token, user }) {
      // console.log(">>>>>>>>> session", session);
      // console.log(">>>>>>>>> token", token);
      // console.log(">>>>>>>>> user", user);

      // session.accessToken = token.accessToken;

      // CUSTOM SESSION
      // session.user.id = data[0].id;
      // session.user.data = data[0];

      return session;
    },

    async redirect({ url, baseUrl }) {
      let redirectUrl = baseUrl + "/auth-redirect";
      // console.log(redirectUrl);
      return redirectUrl;
    },
  },
});
