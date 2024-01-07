"use client";
import "./welcome.scss";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import routes from "@/routes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Welcome = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      <div>
        <ThemeSwitcher />
      </div>

      <div>
        <LanguageSwitcher />
      </div>
      <div>
        <Link href={routes.login}>Login</Link> |
        <Link href={routes.register}>Register</Link>
      </div>
    </>
  );
};

export default Welcome;
