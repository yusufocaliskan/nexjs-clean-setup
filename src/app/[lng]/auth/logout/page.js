'use client';
import useAccount from '@/hooks/useAccount';
import {ProtectedScreen} from '@/layouts';
import {useEffect} from 'react';

const Page = () => {
  const account = useAccount();
  useEffect(() => {
    account.logout();
  }, []);
  return <ProtectedScreen></ProtectedScreen>;
};

export default Page;
