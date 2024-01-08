import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

import { withAuth } from "next-auth/middleware";
import nextAuthMiddleware from "next-auth/middleware";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

//Look for the site lang
export function middleware(req) {
  console.log(req.cookies.get("next-auth.session-token"));

  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // check & handle if logged in
  const cookies = req.cookies.get("next-auth.session-token");
  if (req.nextUrl.pathname.includes("/dashboard") && !cookies?.value) {
    return NextResponse.redirect(new URL(`/${lng}/testtoooo`, req.url));
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = [
  "/",
  "/login",
  "/register",
  "/auth/error",
  "/auth/verify-request",
]; // The whitelisted routes

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const { pathname } = req.nextUrl;
      console.log("pathname-----432-4-324-32-4>");
      // Important! The below only checks if there exists a token. The token is not validated! This means
      // unauthenticated users can set a next-auth.session-token cookie and appear authorized to this
      // middleware. This is not a big deal because we do validate this cookie in the backend and load
      // data based off of its value. This middleware simply redirects unauthenticated users to the login
      // page (and sets a callbackUrl) for all routes, except static files, api routes, Next.js internals,
      // and the whitelisted anonymousRoutes above.
      return Boolean(
        req.cookies.get("next-auth.session-token") || // check if there's a token
          pathname.startsWith("/_next") || // exclude Next.js internals
          pathname.startsWith("/api") || //  exclude all API routes
          pathname.startsWith("/static") || // exclude static files
          publicFileRegex.test(pathname) || // exclude all files in the public folder
          anonymousRoutes.includes(pathname),
      );
    },
  },
  // If you have custom pages like I do, these should be whitelisted!
  pages: {
    error: "/auth/error",
    signIn: "/login",
    verifyRequest: "/auth/verify-request",
  },
});
