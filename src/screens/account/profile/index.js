"use client";
import { ProfileIcon } from "@/components/Icons/ProfileInfoIcons";
import Switch from "@/components/form/Switch";
import AccountLayout from "@/layouts/account";
import "./index.scss";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CountrySelector from "@/components/CountrySelector";
import { CoolButton } from "@/components";

const Profile = () => {
  return (
    <AccountLayout title={"Profile"} icon={<ProfileIcon />}>
      <div className="profile-container">
        <div className="profile-top">
          <div className="profile-info">
            <div className="profile-name">
              <p className="name">Breanne Schinner</p>
              <p className="mail">schinner@ui8.net</p>
              <div className="profile-level">
                <p className="level-text">Level 2 verified</p>
              </div>
            </div>
            <div className="profile-country">
              <CountrySelector />
            </div>
          </div>
        </div>
        <div className="profile-middle">
          <div className="profile-features">
            <p className="features-text">Features</p>
          </div>
          <div className="profile-lvl1">
            <p className="lvl-title">level 1</p>
            <div className="profile-divider" />
            <div className="frame">
              <p className="frame-text">Deposit assets</p>
              <Switch />
            </div>
            <div className="frame">
              <p className="frame-text">Withdraw assets</p>
              <p className="frame-withdraw-text">Enabled $1,000,000/day</p>
            </div>
            <div className="frame">
              <p className="frame-text">Card purchases</p>
              <Switch />
            </div>
            <div className="frame">
              <p className="frame-text">Bank deposit</p>
              <Switch />
            </div>
          </div>
          <div className="profile-lvl2">
            <p className="lvl-title">level 2</p>
            <div className="profile-divider" />
            <div className="frame">
              <p className="frame-text">Fiat and Spot wallet</p>
              <Switch />
            </div>
            <div className="frame">
              <p className="frame-text">Margin wallet</p>
              <p className="frame-withdraw-text">Enabled 100x Leverage</p>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <CoolButton type="Main&Small" label="Save settings" />
        </div>
      </div>
    </AccountLayout>
  );
};

export default Profile;
