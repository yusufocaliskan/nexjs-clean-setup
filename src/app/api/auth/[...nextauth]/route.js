import routes from '@/routes';
import clientInstance from '@/services/clientInstance';
import queryResult from '@/services/queryResult';
import {store} from '@/store';
import NextAuth from 'next-auth/next';

import CredentialsProvider from 'next-auth/providers/credentials';

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'with-email-and-password',

      async authorize(credentials, req) {
        try {
          // Make a signIn request using axios directly
          const response = await clientInstance.post('users/login', credentials);

          if (queryResult.IS_GOOGLE_AUTHENTICATOR_ENABLED(response)) {
            return {
              data: response.data.Data,
              googleAuthenticatorEnabled: true,
              email: credentials.Email,
            };
          }
          //if (queryResult.IS_EMAIL_NOT_CONFIRMED(response.data)) {
          // Check if the login was successful based on your server's response structure
          if (queryResult.isSuccess(response.data)) {
            return {token: response.data.Data};
          }

          //send use to the
          if (queryResult.IS_EMAIL_NOT_CONFIRMED(response.data)) {
            return {email: credentials.Email, notConfirmedEmail: true};
          }

          // If login failed, return null
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: 'with-2fa-authentication',

      async authorize(credentials, req) {
        try {
          // Make a signIn request using axios directly
          const response = await clientInstance.post('users/login/authenticator', credentials);

          console.log(response);
          //if (queryResult.IS_EMAIL_NOT_CONFIRMED(response.data)) {
          // Check if the login was successful based on your server's response structure
          if (queryResult.isSuccess(response.data)) {
            return {token: response.data.Data};
          }

          //send use to the
          if (queryResult.IS_RELOGIN(response.data)) {
            return {email: credentials.Email, isReloading: true};
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
    async session({session, user, token}) {
      session.accessToken = token.accessToken;
      session.notConfirmedEmail = token?.notConfirmedEmail;
      session.googleAuthenticatorEnabled = token?.googleAuthenticatorEnabled;
      session.email = token?.email;
      session.encryptedData = token?.encryptedData;
      session.isAuthenticated = token?.isAuthenticated;
      return session;
    },
    async jwt({token, user, account, profile, isNewUser}) {
      //is email confirmed??

      if (user?.notConfirmedEmail) {
        token.notConfirmedEmail = true;
        token.user = user.email;
        token.isAuthenticated = false;
      }
      if (user?.isReloading) {
        token.isReloading = true;
        token.user = user.email;
        token.isAuthenticated = false;
      }

      if (user?.googleAuthenticatorEnabled) {
        token.googleAuthenticatorEnabled = true;
        token.data = user.data;
        token.encryptedData = user.data;
        token.user = user.email;
        token.isAuthenticated = false;
      }

      //if the sing in success
      if (user?.token) {
        token.accessToken = user.token;
        token.isAuthenticated = true;
      }
      return token;
    },
  },

  //use the below command and generate new one.
  // NOTE: openssl rand -base64 32
  // FIX: Save it in a .env file
  secret: '3gHjDz8qrY6cankwnlWvBNIo6tQWAfpOPfDd52Pdfqw=',

  // Customized the pages
  pages: {
    singIn: routes.login,

    // Redirect to the error page on errors
    error: routes.error,
  },

  session: {
    maxAge: 24 * 60 * 60,
  },

  debug: true,
};

const nextAuthHandler = NextAuth(nextAuthOptions);
export {nextAuthHandler as POST, nextAuthHandler as GET};
