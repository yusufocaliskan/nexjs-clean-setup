import {Card} from '@/components/';
import './stye.scss';
import toast from 'react-hot-toast';
import {useTranslation} from '@/app/i18n/client';
import {MdInfo} from 'react-icons/md';

const TextCopiableBox = ({value, isSecure, info, dontShowCopyButton, label}) => {
  const {t} = useTranslation();
  const onClickCopyButton = () => {
    navigator.clipboard.writeText(value);

    toast.success(t('copied'));
  };
  return (
    <div className="text-box-wrapper">
      <label>
        <p className="text-box-label">{label}</p>
        <input readOnly className="text-box-input" type={isSecure ? 'password' : 'text'} value={value} />
        {info && (
          <Card as="p" color="var(--gray-text)" margin-top=".8rem" display="flex" gap="0.5rem" align-items="center">
            <MdInfo size="1.5rem" color="var(--black)" />
            {info}
          </Card>
        )}
      </label>

      {!dontShowCopyButton && (
        <Card
          as="span"
          onClick={onClickCopyButton}
          background="var(--neutrals1)"
          color="var(--white)"
          border-radius=".25rem"
          text-align="center"
          top="1rem"
          width="fit-content"
          padding="0 0.5rem"
          cursor="pointer"
          user-select="none"
          right="1rem"
          position="absolute"
        >
          <Card as="span">{t('copy')}</Card>
        </Card>
      )}
    </div>
  );
};

export default TextCopiableBox;
