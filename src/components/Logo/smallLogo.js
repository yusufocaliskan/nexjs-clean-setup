import Logo from '../../components/Icons/Logo';
import {useTranslation} from '@/app/i18n/client';
import './index.scss';

const SmallLogo = () => {
  const {t} = useTranslation();

  return (
    <div className="small-logo-div">
      <Logo /> <p className="hepbit">{t('loginPageHepBit')}</p>
    </div>
  );
};

export default SmallLogo;
