"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "../auth.scss";
import LockLine from "../../../../public/assets/icons/LockLine";
import Image from "next/image";
import LeftBG from "../../../../public/assets/images/auth/left-background.png";
import { useState } from "react";
import { CoolButton, PhoneInput } from "@/components";
import { EyeLine, EyeSlash } from "../../../../public/assets/icons";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Login = () => {
  const [button, setButton] = useState("Email");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left-background">
        <Image src={LeftBG} alt="left logo" />{" "}
      </div>
      <div className="login-page-right">
        <div className="login-page-right-top">
          <div className="login-page-right-top-logo"></div>
          <div className="login-page-right-top-text">
            <div>
              <LanguageSwitcher />
            </div>
            <div>|</div>
            <div>
              <ThemeSwitcher />
            </div>
            <div>|</div>
            <div>
              Don’t have an account?
              <span className="sign-up-for-free">Sign up for free</span>
            </div>
          </div>
        </div>
        <div className="login-page-right-content">
          <p className="sign-in-to-hepbit">Sign in to Hepbit</p>
          <div className="visit-url">
            <p className="visit-text">
              Please ensure you are visiting the correct url.
            </p>
            <p className="visit-url-login">
              <LockLine />
              <span className="visit-https">https://</span>
              accounts.hepbit.com/login
            </p>
          </div>
          <div className="divider" />
          <div className="login-form">
            <div className="form-buttons">
              <CoolButton
                selected={button === "Email"}
                onClick={() => setButton("Email")}
                label={"Email"}
              />
              <CoolButton
                onClick={() => setButton("Mobile")}
                selected={button === "Mobile"}
                label={"Mobile"}
              />
            </div>
            {button === "Email" && (
              <div className="form-inputs">
                <div className="email">
                  <p className="email-label">EMAIL</p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="email-input"
                  />
                </div>
                <div className="password">
                  <p className="password-label">PASSWORD</p>
                  <div className="password-area">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="password-input"
                    />
                    <button
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash /> : <EyeLine />}
                    </button>
                  </div>
                </div>
                <div className="scan-and-forgot">
                  <p className="scan-login">Scan to login</p>
                  <p className="forgot-password">Forgot Password?</p>
                </div>
                <div className="login-btn-area">
                  <CoolButton className="login-btn" label="Login" />
                </div>
              </div>
            )}
            {button === "Mobile" && (
              <div className="form-inputs">
                <div className="email">
                  <p className="email-label">Mobile</p>

                  <PhoneInput onChange={(e) => console.log(e)} />
                </div>
                <div className="password">
                  <p className="password-label">PASSWORD</p>
                  <div className="password-area">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="password-input"
                    />
                    <button
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash /> : <EyeLine />}
                    </button>
                  </div>
                </div>
                <div className="scan-and-forgot">
                  <p className="scan-login">Scan to login</p>
                  <p className="forgot-password">Forgot Password?</p>
                </div>
                <div className="login-btn-area">
                  <CoolButton className="login-btn" label="Login" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
