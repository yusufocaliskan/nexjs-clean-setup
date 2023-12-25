"use client";
import { useTranslation } from "@/app/i18n/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginApi } from "@/store/users";

const Welcome = ({ lng }) => {
  const { t } = useTranslation(lng);
  const user = useSelector((state) => state.user);

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

  return <>{queryRes.isLoading ? "Loading...." : "Done!"}</>;
};

export default Welcome;
