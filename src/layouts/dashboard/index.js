'use client';
import React from 'react';
import ProtectedHeader from '../header/protected';
import PublicHeader from '../header/public';
import './index.scss';
import Footer from './footer';
import useCustomSession from '@/hooks/useCustomSession';

const DashboardLayout = ({children, withoutFooter}) => {
  const {isAuthorized} = useCustomSession();
  return (
    <div className="dashboard-container">
      {isAuthorized ? <ProtectedHeader /> : <PublicHeader />}
      <div className="dashboard-content">{children}</div>
      {!withoutFooter && <Footer />}
    </div>
  );
};

export default DashboardLayout;
