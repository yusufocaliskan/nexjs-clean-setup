"use client";
import { useTranslation } from "@/app/i18n/client";
import { CoolButton, TextBox } from "@/components";
import { useState } from "react";

//Registering new user
const Register = ({ lng }) => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  // client side translation, works like this
  //✋ the useTranslation hook also can be passed as props from parents.
  const { t } = useTranslation(lng);

  const handleOnSubmitRegisterForm = () => {
    console.log("Resgistereedd");
  };

  return (
    <>
      <TextBox label={t("email")} value={getEmail} setValue={setEmail} />
      <TextBox
        label={t("password")}
        value={getPassword}
        setValue={setPassword}
      />
      <div>
        <CoolButton onClick={handleOnSubmitRegisterForm} label="Register" />
      </div>
    </>
  );
};

export default Register;
