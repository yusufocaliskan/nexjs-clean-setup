"use client";
import "./welcome.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginApi } from "@/store/users";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Welcome = () => {
  const user = useSelector((state) => state.user);
  const app = useSelector((state) => state.app);

  //Request
  const [check4CandidateData, queryRes] =
    loginApi.useCheck4CandidateDataMutation();
  const [getTokenByMail, tokenData] = loginApi.useGetTokenByMailMutation();

  useEffect(() => {
    check4CandidateData({
      email: "yusufocaliskan@gmail.com",
      password: "Ma5i2121",
    });
    getTokenByMail();
  }, []);

  useEffect(() => {
    console.log("Query Result:  ", queryRes);
    console.log("Token Data  ", tokenData);
  }, [queryRes, tokenData]);

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
