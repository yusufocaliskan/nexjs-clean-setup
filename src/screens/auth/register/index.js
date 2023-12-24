"use client";
import { CoolButton, TextBox } from "@/components";
import { useState } from "react";

//Registering new user
const Register = ({ lng }) => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const handleOnSubmitRegisterForm = () => {
    console.log("Resgistereedd");
  };

  return (
    <>
      <TextBox label={t("email")} value={getEmail} setValue={setEmail} />
      <TextBox label="password" value={getPassword} setValue={setPassword} />
      <div>
        <CoolButton onClick={handleOnSubmitRegisterForm} label="Register" />
      </div>
    </>
  );
};

export default Register;
