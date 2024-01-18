import {userApi} from '@/services/user';
import {useEffect} from 'react';

const AccountLoginHistory = () => {
  const [getLoginHistoryOfTheUser, loginHistoryResponse] = userApi.useGetLoginHistoryOfTheUserMutation();
  useEffect(() => {
    getLoginHistoryOfTheUser();
  }, []);
  useEffect(() => {
    console.log(loginHistoryResponse);
  }, [loginHistoryResponse]);
  return <div></div>;
};

export default AccountLoginHistory;
