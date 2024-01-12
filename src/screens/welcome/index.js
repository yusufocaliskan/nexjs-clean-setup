'use client';
import {useTranslation} from '@/app/i18n/client';
import './welcome.scss';

const Welcome = () => {
  const {t} = useTranslation();
  return (
    <>
      <div>
        <h1>{t('email')}</h1>
      </div>
    </>
  );
};

export default Welcome;
