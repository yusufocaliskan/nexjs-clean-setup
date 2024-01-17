'use client';
import React from 'react';
import {useSession} from 'next-auth/react';
import ProtectedHeader from '../header/protected';
import PublicHeader from '../header/public';
import './index.scss';
import Footer from './footer';

const DashboardLayout = ({children, withoutFooter}) => {
  const session = useSession();
  const isAuthorized = session?.status === 'authenticated';
  return (
    <div className="dashboard-container">
      {isAuthorized ? <ProtectedHeader /> : <PublicHeader />}
      <div className="dashboard-content">{children}</div>
      {!withoutFooter && <Footer />}
    </div>
  );
};

export default DashboardLayout;
