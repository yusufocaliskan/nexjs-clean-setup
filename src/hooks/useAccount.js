import {useDispatch, useSelector} from 'react-redux';
import {authApi} from '@/services/auth';
import {signOut} from 'next-auth/react';
import {cleanUpUserStore, setToken} from '@/store/user';
import queryResult from '@/services/queryResult';

const useAccount = () => {
  const dispatch = useDispatch();
  const [logoutSession, logoutResp] = authApi.useLogoutSessionMutation();

  const logout = async () => {
    const rep = await logoutSession();
    if (queryResult.isSuccess(rep)) {
      dispatch(cleanUpUserStore());
      signOut({redirect: true});
    }
  };
  const setAuthToken = (tokens) => {
    dispatch(setToken(tokens));
  };
  return {logout, setAuthToken};
};

export default useAccount;
