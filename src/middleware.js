import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

import routes from "./routes";
import { protectedScreens } from "./constants";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

//Look for the site lang
export function middleware(req) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  //Check if the screen is protected
  if (check4Protection(req, lng)) {
    return NextResponse.redirect(new URL(`/${lng}/${routes.login}`, req.url));
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

const check4Protection = (req, lng) => {
  const cookies = req.cookies.get("next-auth.session-token");
  return protectedScreens.some(
    (screen) => screen.test(req.nextUrl.pathname) && !cookies?.value,
  );
  if (isItAProtectedScreen) {
    //sent them tho the login pagee
  }
};
