"use client";
import "./welcome.scss";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import routes from "@/routes";

const Welcome = () => {
  return (
    <>
      <div>
        <ThemeSwitcher />
      </div>

      <div>
        <LanguageSwitcher />
      </div>
      <div>
        <Link href={routes.auth.login}>Login</Link> |
        <Link href={routes.auth.register}>Register</Link>
      </div>
    </>
  );
};

export default Welcome;
