"use client";
import "./welcome.scss";
import { useTranslation } from "@/app/i18n/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginApi } from "@/store/users";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Welcome = ({ lng }) => {
  const user = useSelector((state) => state.user);
  const app = useSelector((state) => state.app);

  //Request
  const [check4CandidateData, queryRes] =
    loginApi.useCheck4CandidateDataMutation();

  useEffect(() => {
    check4CandidateData({
      email: "yusufocaliskan@gmail.com",
      password: "Ma5i2121",
    });
  }, []);

  useEffect(() => {
    console.log("Query Result:  ", queryRes);
  }, [queryRes]);

  useEffect(() => {
    console.log("The data in the store: here ", user.informations);
  }, [user]);

  return (
    <>
      <div>
        <ThemeSwitcher />
      </div>
      <div>
        <LanguageSwitcher />
      </div>
      {queryRes.isLoading ? "Loading...." : "Done!"}
    </>
  );
};

export default Welcome;
