import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

const useCustomSession = () => {
  const nextAuthSession = useSession();
  const [session, setCustomizedSession] = useState();

  //TODO: use an api request, using this way instead
  useEffect(() => {
    let status = 'unauthenticated';
    if (nextAuthSession?.data?.isAuthenticated) {
      status = 'authenticated';
    }
    console.log('Herrree', nextAuthSession);

    const newSession = {
      status: status,
      data: nextAuthSession.data,
      update: nextAuthSession.update,
      isAuthorized: status === 'authenticated',
    };
    setCustomizedSession(newSession);
  }, [nextAuthSession]);

  return {session, ...session};
};
export default useCustomSession;
