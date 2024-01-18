'use client';
import {ProfileIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import './changePasswordStyle.scss';
import {useSelector} from 'react-redux';
import {useTranslation} from '@/app/i18n/client';
import {Card, CenteredContent, Form, MailBox, Quote, Spacer, Text, TextBox, VerticalDivider} from '@/components';
import {changePasswordValidations} from '@/validations/account';
import {useEffect, useState} from 'react';
import {useFormik} from 'formik';

import {authApi, changeUserPassword} from '@/services/auth';
import {userApi} from '@/services/user';
import queryResult from '@/services/queryResult';
import toast from 'react-hot-toast';
import useCounter from '@/hooks/useCounter';
import useAccount from '@/hooks/useAccount';
import Image from 'next/image';
import {AccountLayoutTitle} from '@/layouts';
const ChangePassword = () => {
  const {t} = useTranslation();
  const {name, surname, email, levelNo, phoneNumber, ...userInformations} = useSelector(
    (state) => state.user.informations
  );
  const [isLoading, setIsLoading] = useState(false);
  const [changeUserPassword, changePasswordResponse] = userApi.useChangeUserPasswodMutation();
  const passwordCounter = useCounter('passwordCounter', 3);
  const account = useAccount();

  const changePasswordForm = useFormik({
    initialValues: {
      CurrentPassword: '',
      NewPassword: '',
      ConfirmNewPassword: '',
    },
    validateOnMount: false,
    validationSchema: changePasswordValidations,
    onSubmit: () => handleOnFormSubmitted(),
  });

  const handleOnFormSubmitted = async () => {
    const res = await changeUserPassword({...changePasswordForm.values});
    if (queryResult.isSuccess(res)) {
      //set the tokens..
      account.setAuthToken(res?.data?.Data);
      toast.success(t('passwordHasUpdatedMessage').replace('%s', passwordCounter.counter));
      passwordCounter.startCounter();
    }
  };

  useEffect(() => {
    //Logout
    if (passwordCounter.isCounterStarted && passwordCounter.counter <= 0) {
      account.logout();
    }
  }, [passwordCounter.counter]);

  return (
    <AccountLayout id title={t('changePassword')} icon={<ProfileIcon />}>
      <Card
        width="100%"
        gap="5rem"
        display="flex"
        flex-direction={{base: 'column', lg: 'row', md: 'column'}}
        margin-top={{lg: '4rem'}}
      >
        <Card display="flex" gap="3rem" flex-direction="column">
          <AccountLayoutTitle margin-bottom="2rem" title={`${t('hi')} ${name} ✋`} />
          <Text animated font-size="1.3rem" color="var(--gray-text)">
            {t('changePasswordDesc')}
          </Text>{' '}
        </Card>
        <Card
          width={{base: '100%', lg: '100%', md: '90%'}}
          padding="1.25rem"
          border-radius="1.25rem"
          background="var(--neutrals7)"
        >
          <Form
            onSubmit={changePasswordForm.handleSubmit}
            formInstance={changePasswordForm}
            isLoading={isLoading}
            submitButtonText={t('changePassword')}
            dontDisplayCaptcha
          >
            <Text font-size="1.5rem">{t('changeYourPassword')}</Text>
            <TextBox
              formInstance={changePasswordForm}
              isSecure
              label={t('currentPassword')}
              type="password"
              name="CurrentPassword"
              placeholder={t('currentPasswordPlaceholder')}
              value={changePasswordForm.values.CurrentPassword}
              setValue={(value) => changePasswordForm.setFieldValue('CurrentPassword', value)}
            />
            <TextBox
              formInstance={changePasswordForm}
              isSecure
              label={t('newPassword')}
              type="password"
              name="NewPassword"
              placeholder={t('newPasswordPlaceholder')}
              value={changePasswordForm.values.NewPassword}
              setValue={(value) => changePasswordForm.setFieldValue('NewPassword', value)}
            />
            <TextBox
              formInstance={changePasswordForm}
              isSecure
              label={t('confirmNewPassword')}
              type="password"
              name="ConfirmNewPassword"
              placeholder={t('confirmNewPasswordPlaceholder')}
              value={changePasswordForm.values.ConfirmNewPassword}
              setValue={(value) => changePasswordForm.setFieldValue('ConfirmNewPassword', value)}
            />
          </Form>
        </Card>
        <Card
          width="50%"
          align-items="flex-end"
          justify-content="flex-end"
          display={{base: 'none', lg: 'flex', md: 'none'}}
          animated
        >
          <Image width="200" height="200" src="/assets/images/auth/composition-1.png" />
        </Card>
      </Card>
    </AccountLayout>
  );
};

export default ChangePassword;
