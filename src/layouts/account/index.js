'use client';
import React from 'react';
import DashboardLayout from '../dashboard';
import './index.scss';
import {sideBarArray} from './sideBarArrayForMobile';
import Dropdown from '@/components/form/Dropdown';
import AccountLayoutMenu from './menu';

const AccountLayout = ({children, title, icon}) => {
  return (
    <DashboardLayout>
      <div className="page-title">
        <p className="account-title">{title}</p>
        <p className="account-mobile-title">{title}</p>
      </div>
      <div className="page-content">
        <AccountLayoutMenu />
        <div className="account-dropdown">
          <Dropdown options={sideBarArray} route title={title} icon={icon} />
        </div>
        <div className="account-content">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default AccountLayout;
