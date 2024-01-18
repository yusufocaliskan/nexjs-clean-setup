'use client';
import React from 'react';
import './accountLayoutMenuStyle.scss';
import {useRouter} from 'next/navigation';
import usePath from '@/hooks/usePath';
import {useTranslation} from '@/app/i18n/client';
import routes from '@/routes';
import {
  APIKeysIcon,
  LoginHistoryIcon,
  PasswordIcon,
  ProfileIcon,
  ReferralsIcon,
  TwoFAIcon,
} from '@/components/Icons/ProfileInfoIcons';
const AccountLayoutMenu = ({children, title, icon}) => {
  const {checkIfTheScreenIsActive} = usePath();
  const router = useRouter();
  const {t} = useTranslation();
  const leftMenu = [
    {
      text: t('accountProfile'),
      route: routes.accountProfile,
      icon: ProfileIcon,
    },
    {
      text: t('accountReferrals'),
      route: routes.accountReferrals,
      icon: ReferralsIcon,
    },
    {
      text: t('accountApiKeys'),
      route: routes.accountApiKeys,
      icon: APIKeysIcon,
    },
    {
      text: t('accountLoginHistory'),
      route: routes.accountLoginHistory,
      icon: LoginHistoryIcon,
    },
    {
      text: t('account2FA'),
      route: routes.account2FA,
      icon: TwoFAIcon,
    },
    {
      text: t('accountChangePassword'),
      route: routes.accountPasswordChange,
      icon: PasswordIcon,
    },
  ];

  //check if the screen is in used
  const setSelectedClass = (route) => checkIfTheScreenIsActive(route) && 'selected';

  const NavbarLinkItem = ({route, text, Icon}) => {
    return (
      <div onClick={() => router.push(route)} className={`side-nav-title ${setSelectedClass(route)}`}>
        <Icon /> <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="side-nav">
      {leftMenu.map((item, index) => {
        return <NavbarLinkItem Icon={item.icon} route={item.route} text={item.text} key={index} />;
      })}
    </div>
  );
};

export default AccountLayoutMenu;
