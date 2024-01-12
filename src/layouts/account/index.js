"use client";
import React from "react";
import DashboardLayout from "../dashboard";
import {
  APIKeysIcon,
  LoginHistoryIcon,
  PasswordIcon,
  ProfileIcon,
  ReferralsIcon,
  TwoFAIcon,
} from "@/components/Icons/ProfileInfoIcons";
import "./index.scss";
import { useState } from "react";
import { sideBarArray } from "./sideBarArrayForMobile";
import Dropdown from "@/components/form/Dropdown";
import { useRouter } from "next/navigation";
import routes from "@/routes";

const AccountLayout = ({ children, title, icon }) => {
  const [isActive, setIsActive] = useState("");
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="page-title">
        <p className="account-title">{title}</p>
        <p className="account-mobile-title">{title}</p>
      </div>
      <div className="page-content">
        <div className="side-nav">
          <p
            onClick={() => (
              setIsActive("Profile"), router.push(routes.accountProfile)
            )}
            className={`side-nav-title ${
              isActive === "Profile" ? "selected" : ""
            }`}
          >
            <ProfileIcon
              fill={isActive === "Profile" ? "var(--loginPageText)" : "#777e91"}
            />{" "}
            <span>Profile</span>
          </p>
          <p
            onClick={() => (
              router.push(routes.accountReferrals), setIsActive("Referrals")
            )}
            className={`side-nav-title ${
              isActive === "Referrals" ? "selected" : ""
            }`}
          >
            <ReferralsIcon
              fill={
                isActive === "Referrals" ? "var(--loginPageText)" : "#777e91"
              }
            />{" "}
            <span>Referrals</span>
          </p>
          <p
            onClick={() => setIsActive("API")}
            className={`side-nav-title ${isActive === "API" ? "selected" : ""}`}
          >
            <APIKeysIcon
              fill={isActive === "API" ? "var(--loginPageText)" : "#777e91"}
            />{" "}
            <span>API Keys</span>
          </p>
          <div className="account-divider" />
          <p
            onClick={() => setIsActive("Login")}
            className={`side-nav-title ${
              isActive === "Login" ? "selected" : ""
            }`}
          >
            <LoginHistoryIcon
              fill={isActive === "Login" ? "var(--loginPageText)" : "#777e91"}
            />{" "}
            <span>Sessions & login history</span>
          </p>
          <p
            onClick={() => setIsActive("2FA")}
            className={`side-nav-title ${isActive === "2FA" ? "selected" : ""}`}
          >
            {" "}
            <TwoFAIcon
              fill={isActive === "2FA" ? "var(--loginPageText)" : "#777e91"}
            />{" "}
            <span>2FA</span>
          </p>
          <p
            onClick={() => (
              setIsActive("Password"), setIsTitle("Change password")
            )}
            className={`side-nav-title ${
              isActive === "Password" ? "selected" : ""
            }`}
          >
            {" "}
            <PasswordIcon
              fill={
                isActive === "Password" ? "var(--loginPageText)" : "#777e91"
              }
            />{" "}
            <span>Change password</span>
          </p>
        </div>
        <div className="account-dropdown">
          <Dropdown options={sideBarArray} route title={title} icon={icon} />
        </div>
        <div className="account-content">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default AccountLayout;
