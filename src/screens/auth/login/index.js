'use client';

import './index.scss';
import {useEffect, useState} from 'react';
import {useTranslation} from '@/app/i18n/client';

import {
  LockLine,
  Title,
  PasswordInputs,
  TextBox,
  Form,
  LoggedInProfileCard,
  Modal,
  VerificationCode,
} from '@/components';

import Link from 'next/link';
import SmallLogo from '@/components/Logo/smallLogo';
import {useFormik} from 'formik';
import {loginFormValidations, twoFAValidations} from '@/validations/auth';
import LeftSide from '../left-side';
import {getCsrfToken, signIn} from 'next-auth/react';
import toast from 'react-hot-toast';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import {useRouter} from 'next/navigation';
import {setToken} from '@/store/user';
import {useDispatch, useSelector} from 'react-redux';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {authApi} from '@/services/auth';
import useCustomSession from '@/hooks/useCustomSession';
import {getSelectedLanguage} from '@/utils';
import axios from 'axios';

const Login = ({onSubmitTestHandler}) => {
  const [button, setButton] = useState('Email');
  const [isLoading, setIsLoading] = useState(true);

  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  //Store
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const {session, isAuthorized} = useCustomSession();
  const [getUserInformations, userInformationResponse] = authApi.useGetUserInformationsMutation();

  const router = useRouter();
  const {t} = useTranslation();

  //SEssions

  const loginForm = useFormik({
    initialValues: {
      Password: '',
      Email: '',
      reCaptcha: '',
    },
    validationSchema: loginFormValidations,
    validateOnMount: true,
    onSubmit: () => handleOnSubmitLoginForm(),
  });

  const two2FAForm = useFormik({
    initialValues: {
      Token: ['', '', '', '', '', ''],
      reCaptcha: '',
    },

    validateOnMount: true,
    validationSchema: twoFAValidations,
    onSubmit: () => handleOn2FAFormSubmit(),
  });

  const data = loginForm.values;
  //store the user token that comes from server

  useEffect(() => {
    const startTheSessionListener = () => {
      //is user need to confirm her/his e-mail?
      //redirect to email confirmation page
      if (session?.data?.notConfirmedEmail) {
        //return router.push(routes.emailVerification)
      }

      if (session?.data?.googleAuthenticatorEnabled) {
        setIs2FAModalOpen(true);
      }

      //Is signIn success
      // - The user's email must be verified and
      // - google authenticator must be disabled
      if (isAuthorized && !session?.data?.notConfirmedEmail && !session?.data?.googleAuthenticatorEnabled) {
        const tokens = session?.data?.accessToken;

        if (tokens) {
          //TODO: Find a way to clear accessToken in session.
          //After saving in store. The session is accessable in client side.
          //(check, dev console/application/cookies)
          dispatch(setToken(tokens));
          //Get user informations.

          getUserInformations();
          //router.push(routes.welcome);
        }
      }
    };
    startTheSessionListener();
  }, [session, dispatch, isAuthorized, router]);

  //If the 2fa form submitted
  const handleOn2FAFormSubmit = async () => {
    setIsLoading(true);
    const data = {
      GoogleAuthenticatorCode: two2FAForm.values.Token.join(''),
      Email: session.data.email,
      EncryptedToken: session.data.encryptedData,
    };
    const resp = await signIn('with-2fa-authentication', {
      ...data,
      redirect: false,
    });

    if (!resp.ok) {
      toast.error('Wrong informations');
    }

    //close the modal and display a message
    if (resp.ok) {
      two2FAForm.resetForm();
      //router.push(routes.welcome);
      setIs2FAModalOpen(false);
      toast.success(t('welcome'));
    }
    setIsLoading(false);
  };

  const handleOnSubmitLoginForm = async (vals) => {
    setIsLoading(true);
    const resp = await signIn('with-email-and-password', {
      ...data,
      redirect: false,
      //callbackUrl: routes.welcome,
    });

    if (!resp.ok) {
      toast.error('Wrong informations');
    }
    if (resp.ok) {
      loginForm.resetForm();
      //router.push(routes.welcome);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page-container">
      <Modal isOpen={is2FAModalOpen} setIsOpen={setIs2FAModalOpen} w="430px">
        <div className="twofa-form-wrapper">
          <Form
            onSubmit={twoFAValidations.handleSubmit}
            formInstance={two2FAForm}
            isLoading={isLoading}
            submitButtonText={t('loginPageLogin')}
          >
            <Title text={t('verification')} />
            <div className="form-inputs">
              <div className="email">
                <div className="verification-div">
                  <VerificationCode
                    formInstance={two2FAForm}
                    verificationCode={two2FAForm.values.Token}
                    name="Token"
                    setVerificationCode={(value) => two2FAForm.setFieldValue('Token', value)}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
      <LeftSide />
      <div className="login-page-right">
        <div className="login-page-right-top">
          <SmallLogo />
          <div style={{display: 'flex', gap: '10px'}} className="login-page-right-top-text">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {t('dontHaveAnAccount')}
            <span className="sign-up-for-free">{t('signUpForFree')}</span>
          </div>
        </div>
        <div className="login-page-right-content">
          <Title text={t('loginPageSignInToHepbit')} />
          <div className="visit-url">
            <p className="visit-text">{t('loginPageCorrectUrl')}</p>
            <p className="visit-url-login">
              <LockLine />
              <span className="visit-https"> {t('loginPageHttps')}</span>
              criex.com/{getSelectedLanguage()}/auth/login
            </p>
          </div>
          <div className="divider" />
          <div className="login-form">
            {/* {!isAuthorized && (
              <div className="form-buttons">
                <CoolButton
                  selected={button === "Email"}
                  onClick={() => setButton("Email")}
                  label={t("loginPageEmail")}
                  type="Selected"
                />
                <CoolButton
                  onClick={() => setButton("Mobile")}
                  selected={button === "Mobile"}
                  label={t("loginPageMobile")}
                  type="Selected"
                />
              </div>
            )} */}
            <LoggedInProfileCard session={session} />
            {!isAuthorized && button === 'Email' && (
              <Form
                id="login-form"
                onSubmit={loginForm.handleSubmit}
                formInstance={loginForm}
                isLoading={isLoading}
                submitButtonText={t('loginPageLogin')}
                onSubmitTestHandler={onSubmitTestHandler}
              >
                <div className="form-inputs">
                  <div className="email">
                    <TextBox
                      formInstance={loginForm}
                      label={t('loginPageEmail')}
                      type="email"
                      name="Email"
                      placeholder={t('loginPageEmailPlaceHolder')}
                      value={loginForm.values.Email}
                      setValue={(value) => loginForm.setFieldValue('Email', value)}
                    />
                  </div>
                  <div className="password">
                    <div className="password-area">
                      <PasswordInputs formInstance={loginForm} />
                    </div>
                  </div>
                  <div className="scan-and-forgot">
                    <p className="scan-login">{t('loginPageScanToLogin')} </p>
                    <p className="forgot-password">
                      <Link href="/auth/forgot-password">{t('loginPageForgotPassword')}</Link>
                    </p>
                  </div>
                </div>
              </Form>
            )}
            {/* {button === "Mobile" && (
              <Form
                onSubmit={loginForm.handleSubmit}
                formInstance={loginForm}
                isLoading={loginResponse.isLoading}
              >
                <div className="form-inputs">
                  <div className="email">
                    <p className="email-label">{t("loginPageMobile")}</p>
                    <PhoneInput onChange={(e) => console.log(e)} />
                  </div>
                  <div className="password">
                    <div className="password-area">
                      <PasswordInputs formInstance={loginForm} />
                    </div>
                  </div>
                  <div className="scan-and-forgot">
                    <p className="scan-login">{t("loginPageScanToLogin")} </p>
                    <p className="forgot-password">
                      <Link href="/auth/forgot-password">
                        {t("loginPageForgotPassword")}
                      </Link>
                    </p>
                  </div>
                  <GoogleReCaptcha
                    reCapthchaRef={reCapthchaRef}
                    onChange={handleOnReCaptchaChanged}
                  />
                  <FormTriggerButton label={t("loginPageLogin")} />
                </div>
              </Form>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
