import {
  APIKeysIcon,
  LoginHistoryIcon,
  PasswordIcon,
  ProfileIcon,
  ReferralsIcon,
  TwoFAIcon,
} from "@/components/Icons/ProfileInfoIcons";
import routes from "@/routes";

export const sideBarArray = [
  {
    value: "Profile",
    icon: <ProfileIcon />,
    link: routes.accountProfile,
  },
  {
    value: "Referrals",
    icon: <ReferralsIcon />,
    link: routes.accountReferrals,
  },
  {
    value: "API keys",
    icon: <APIKeysIcon />,
    link: routes.accountProfile,
  },

  {
    value: "Sessions & login history",
    icon: <LoginHistoryIcon />,
    link: routes.accountProfile,
  },
  {
    value: "2FA",
    icon: <TwoFAIcon />,
    link: routes.accountProfile,
  },
  {
    value: "Change password",
    icon: <PasswordIcon />,
    link: routes.accountProfile,
  },
];
