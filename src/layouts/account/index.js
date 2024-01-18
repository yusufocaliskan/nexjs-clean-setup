'use client';
import React, {useEffect} from 'react';
import DashboardLayout from '../dashboard';
import {
  APIKeysIcon,
  LoginHistoryIcon,
  PasswordIcon,
  ProfileIcon,
  ReferralsIcon,
  TwoFAIcon,
} from '@/components/Icons/ProfileInfoIcons';
import './index.scss';
import {sideBarArray} from './sideBarArrayForMobile';
import Dropdown from '@/components/form/Dropdown';
import {useRouter} from 'next/navigation';
import routes from '@/routes';
import usePath from '@/hooks/usePath';
import {useTranslation} from '@/app/i18n/client';

const AccountLayout = ({children, title, icon}) => {
  const {checkIfTheScreenIsActive} = usePath();
  const router = useRouter();
  const {t} = useTranslation();

  //check if the screen is in used
  const setActiveAsActivePage = (route) => (checkIfTheScreenIsActive(route) ? 'var(--loginPageText)' : '#777e91');
  const setSelectedClass = (route) => checkIfTheScreenIsActive(route) && 'selected';

  const leftMenu = [
    {
      text:t('accountProfile'),
      route: routes.accountProfile,
      icon: ProfileIcon,
    },
    {
      text:t('accountReferrals'),
      route: routes.accountReferrals,
      icon: ReferralsIcon,
    },
    {
      text:t('accountApiKeys'),
      route: routes.accountApiKeys,
      icon: APIKeysIcon,
    },
    {
      text:t('accountLoginHistory'),
      route: routes.accountLoginHistory,
      icon: LoginHistoryIcon,
    },
    {
      text:t('account2FA'),
      route: routes.account2FA,
      icon: TwoFAIcon,
    },
    {
      text:t('accountChangePassword'),
      route: routes.accountPasswordChange,
      icon: PasswordIcon,
    },
  ];

  const NavbarLinkItem = ({route, text, Icon}) => {
    return (
      <div onClick={() => router.push(route)} className={`side-nav-title ${setSelectedClass(route)}`}>
        <Icon fill={setActiveAsActivePage(route)} /> <span>{text}</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="page-title">
        <p className="account-title">{title}</p>
        <p className="account-mobile-title">{title}</p>
      </div>
      <div className="page-content">
        <div className="side-nav">
          {leftMenu.map((item, index) => {
            return <NavbarLinkItem Icon={item.icon} route={item.route} text={item.text} key={index} />;
          })}
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
