"use client";
import "./welcome.scss";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import routes from "@/routes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import PublicHeader from "@/layouts/header/public";

const Welcome = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      <PublicHeader />
    </>
  );
};

export default Welcome;
