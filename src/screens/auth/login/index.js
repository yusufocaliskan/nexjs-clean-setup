"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "../auth.scss";

const Login = () => {
  return (
    <div className="login-page-container">
      <div className="login-page-left-background" />

      <div>
        <ThemeSwitcher />
        login kısmı
      </div>
    </div>
  );
};

export default Login;
