'use client';
import {useTranslation} from '@/app/i18n/client';
import './welcome.scss';
import {LoggedInProfileCard} from '@/components';
import Link from 'next/link';
import routes from '@/routes';

const Welcome = () => {
  const {t} = useTranslation();
  return (
    <>
      <div>
        <h1>{t('email')}</h1>
        <LoggedInProfileCard />
        <Link href={routes.login}>Login</Link>
      </div>
    </>
  );
};

export default Welcome;
