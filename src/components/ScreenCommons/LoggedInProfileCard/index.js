import {ProtectedArea} from '@/layouts';
import {CoolButton} from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '@/app/i18n/client';
import {authApi} from '@/services/auth';
import {signOut, useSession} from 'next-auth/react';
import {cleanUpUserStore} from '@/store/user';
import queryResult from '@/services/queryResult';
import AccountLayoutMenu from '@/layouts/account/menu';
import Image from 'next/image';

const LoggedInProfileCard = () => {
  const user = useSelector((state) => state.user);
  const {t} = useTranslation();
  const session = useSession();

  const dispatch = useDispatch();
  const [logoutSession, logoutResp] = authApi.useLogoutSessionMutation();

  const handleOnLoggout = async () => {
    const rep = await logoutSession();
    if (queryResult.isSuccess(rep)) {
      dispatch(cleanUpUserStore());
      signOut({redirect: true});
    }
  };

  return (
    <ProtectedArea session={session}>
      <div
        style={{
          borderWidth: 1,
          borderColor: '#aaa',

          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <b>
              {t('welcome')} {user?.informations?.name},
            </b>
            <div>
              <i>{user?.informations?.email}</i>
            </div>
          </div>
          <div>
            <CoolButton label={t('logout')} type="Small" onClick={() => handleOnLoggout()} />
          </div>{' '}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <AccountLayoutMenu />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Image width="120" height="120" src="/assets/images/auth/composition-1.png" />
          </div>
        </div>
      </div>
    </ProtectedArea>
  );
};

export default LoggedInProfileCard;
