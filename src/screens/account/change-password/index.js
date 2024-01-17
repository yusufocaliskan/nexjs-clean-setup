'use client';
import {ProfileIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import './changePasswordStyle.scss';
import {useSelector} from 'react-redux';
import {useTranslation} from '@/app/i18n/client';
import {CenteredContent, Form, Quote, Spacer, Text, TextBox} from '@/components';
import {changePasswordValidations} from '@/validations/account';
import {useEffect, useState} from 'react';
import {useFormik} from 'formik';

import {authApi, changeUserPassword} from '@/services/auth';
import {userApi} from '@/services/user';
import queryResult from '@/services/queryResult';
import toast from 'react-hot-toast';
import useCounter from '@/hooks/useCounter';
import useAccount from '@/hooks/useAccount';
const ChangePassword = () => {
  const {t} = useTranslation();
  const {name, surname, email, levelNo, phoneNumber, ...userInformations} = useSelector(
    (state) => state.user.informations
  );
  const [isLoading, setIsLoading] = useState(false);
  const [changeUserPassword, changePasswordResponse] = userApi.useChangeUserPasswodMutation();
  const passwordCounter = useCounter('passwordCounter', 5);
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
  useEffect(() => {
    console.log(changePasswordForm.values);
  }, [changePasswordForm.values]);
  const handleOnFormSubmitted = async () => {
    const res = await changeUserPassword({...changePasswordForm.values});
    if (queryResult.isSuccess(res)) {
      toast.success(t('passwordHasUpdatedMessage'));
      passwordCounter.startCounter();
    }
  };
  useEffect(() => {
    //Logout
    if (passwordCounter.isCounterStarted && passwordCounter.counter <= 0) {
      console.log(changePasswordResponse?.data?.Data.AuthToken);
      account.setAuthToken(changePasswordResponse?.data?.Data.AuthToken);

      account.logout();
    }
  }, [passwordCounter.counter]);

  return (
    <AccountLayout title={t('changePassword')} icon={<ProfileIcon />}>
      <CenteredContent>
        <Text>
          {t('hi')} {name} ✋,
        </Text>
        <Quote>{t('changePasswordDesc')}</Quote>
        <Spacer h="20px" />
        <Form
          onSubmit={changePasswordForm.handleSubmit}
          formInstance={changePasswordForm}
          isLoading={isLoading}
          submitButtonText={t('changePassword')}
          dontDisplayCaptcha
        >
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
      </CenteredContent>
    </AccountLayout>
  );
};

export default ChangePassword;
