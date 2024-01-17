'use client';
import React from 'react';
import './index.scss';
import {useTranslation} from '@/app/i18n/client';
import {useRouter} from 'next/navigation';
import {MailBox, TextBox, Title, Form} from '@/components';
import LogoBg from '@/components/Logo';
import SmallLogo from '@/components/Logo/smallLogo';
import {useFormik} from 'formik';
import {deletePasswordFormValidations} from '@/validations/auth';
import {authApi} from '@/services/auth';
import queryResult from '@/services/queryResult';
import routes from '@/routes';
import toast from 'react-hot-toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const ResetPassword = () => {
  const [deletePassword, deletePasswordResponse] = authApi.useDeletePasswordMutation();

  const deletePasswordForm = useFormik({
    initialValues: {
      Email: '',
      reCaptcha: '',
    },
    validationSchema: deletePasswordFormValidations,
    onSubmit: () => handleDeletePasswordFormSubmit(),
  });

  const handleDeletePasswordFormSubmit = async () => {
    const data = {...deletePasswordForm.values};

    try {
      const resp = await deletePassword(data);

      if (queryResult.isError(resp) || queryResult.isWarning(resp)) {
        if (queryResult.isWarning(resp)) {
        }
        return toast.error(resp.error?.data?.Message);
      }

      if (queryResult.isSuccess(resp)) {
        toast.success(t('forgotPasswordPageSuccessMessage'));

        deletePasswordForm.resetForm();

        return setTimeout(() => {
          router.push(routes.login);
        }, 3000);
      }
    } catch (error) {
      return toast.error(t('unknownRequestErrorMessage'));
    }
  };

  const {t} = useTranslation();
  const router = useRouter();

  return (
    <div className="forgot-page-container">
      <div className="forgot-page-left-background">
        <LogoBg />
      </div>
      <div className="forgot-page-right">
        <div className="forgot-page-right-top">
          <SmallLogo />
          <p style={{display: 'flex', gap: '10px'}} className="forgot-page-right-top-text">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {t('dontHaveAnAccount')}
            <span className="sign-up-for-free">{t('signUpForFree')}</span>
          </p>
        </div>
        <div className="forgot-page-right-content">
          <Form
            onSubmit={deletePasswordForm.handleSubmit}
            isLoading={deletePasswordResponse.isLoading}
            formInstance={deletePasswordForm}
            submitButtonText={t('forgotPasswordPageContinue')}
          >
            <Title text={t('forgotPasswordPageForgotPassword')} />
            <div className="visit-url">
              <p className="visit-text">{t('forgotPasswordPageSecurityPurpose')}</p>
              <div className="divider" />
              <TextBox
                label={t('forgotPasswordPageEnterEmail')}
                type="email"
                name="email"
                placeholder={t('justEmail')}
                icon={<MailBox />}
                formInstance={deletePasswordForm}
                value={deletePasswordForm.values.Email}
                setValue={(value) => deletePasswordForm.setFieldValue('Email', value)}
              />
            </div>
            <div className="forgot-password-buttons-bottom">
              <p className="forgot-password-never-mind" onClick={() => router.push('/auth/login')}>
                {t('forgotPasswordPageNeverMind')}
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
