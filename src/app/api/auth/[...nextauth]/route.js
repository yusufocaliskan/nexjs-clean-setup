import { appConfigs } from "@/configs";
import routes from "@/routes";
import clientInstance from "@/services/clientInstance";
import queryResult from "@/services/queryResult";
import axios from "axios";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials, req) {
        try {
          // Make a signIn request using axios directly
          const response = await clientInstance.post(
            "users/login",
            credentials,
          );

          //if (queryResult.IS_EMAIL_NOT_CONFIRMED(response.data)) {
          // Check if the login was successful based on your server's response structure
          if (queryResult.isSuccess(response.data)) {
            return { token: response.data.Data };
          }

          //send use to the
          if (queryResult.IS_EMAIL_NOT_CONFIRMED(response.data)) {
            return { email: credentials.Email, notConfirmedEmail: true };
          }

          // If login failed, return null
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  //Some  usefull calbacks
  callbacks: {
    async session({ session, user, token }) {
      //console.log("CalBack Session", { session, user, token });
      session.accessToken = token.accessToken;
      session.notConfirmedEmail = token?.notConfirmedEmail;
      session.email = token?.email;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //is email confirmed??

      if (user?.notConfirmedEmail) {
        token.notConfirmedEmail = true;
        token.user = user.email;
      }

      //if the sing in success
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
  },

  //use the below command and generate new one.
  // NOTE: openssl rand -base64 32
  // FIX: Save it in a .env file
  secret: "3gHjDz8qrY6cankwnlWvBNIo6tQWAfpOPfDd52Pdfqw=",

  // Customized the pages
  pages: {
    singIn: routes.auth.login,

    // Redirect to the error page on errors
    error: routes.auth.error,
  },

  session: {
    maxAge: 24 * 60 * 60,
  },

  debug: true,
};
const nextAuthHandler = NextAuth(nextAuthOptions);

export { nextAuthHandler as POST, nextAuthHandler as GET };
