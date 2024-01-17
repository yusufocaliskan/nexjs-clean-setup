import toast from 'react-hot-toast';
import ErrorDisplayer from './ErrorsDisplayer';
import {useEffect} from 'react';
import {appConfigs} from '@/configs';
import GiantLoaderAnimation from '../LoadingGif/GiantLoaderAnimation';
import {motion} from 'framer-motion';
import {useTranslation} from '@/app/i18n/client';
import {FormTriggerButton, GoogleReCaptcha, Spacer} from '@/components';
import Form4TestingUnits from './Form4TestingUnits';

const Form = ({
  id,
  children,
  formInstance,
  dontDisplayErrors = false,
  dontDisplayCaptcha = false,
  submitButtonText = 'Custom Text',
  captchaRef,
  onSubmitTestHandler,
}) => {
  const {t} = useTranslation();

  //set a max post request
  useEffect(() => {
    if (formInstance.submitCount >= appConfigs.form.maxFormRequestSize) {
      formInstance.resetForm();
      toast.error(t('maxFormRequestSizeText'));
      //setIsFormReachedMaxTresholde(true);
    }
  }, [formInstance.submitCount]);

  //Testing Units
  // if (process.env.NODE_ENV == 'test') {
  //   return <Form4TestingUnits id={id}>{children}</Form4TestingUnits>;
  // }

  return (
    <>
      {/* //TODO: Try to find a better desing of GiantLoaderAnimation */}
      {/* {isLoading && ( */}
      {/*   <GiantLoaderAnimation isOpen={isLoading} setIsLoading={setIsLoading} /> */}
      {/* )} */}
      <motion.div style={{width: '100%'}} initial={{opacity: 0.5, y: 30}} animate={{opacity: 1, y: 0}}>
        <form
          data-testid={id}
          initial={{opacity: 0.5, y: 30}}
          animate={{opacity: 1, y: 0}}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
          onSubmit={onSubmitTestHandler ? onSubmitTestHandler : formInstance.handleSubmit}
        >
          {!dontDisplayErrors && formInstance.submitCount > 0 && <ErrorDisplayer formInstance={formInstance} />}
          {/* Do not display any erro till first submit */}
          {children}

          {/* //TODO: Check if the stastus of the captcha is active */}
          {!dontDisplayCaptcha && (
            <GoogleReCaptcha
              onChange={(val) => formInstance.setFieldValue('reCaptcha', val)}
              reCapthchaRef={captchaRef}
            />
          )}

          <FormTriggerButton formInstance={formInstance} isLoading={formInstance.isLoading} label={submitButtonText} />

          <Spacer />
        </form>
      </motion.div>
    </>
  );
};

export default Form;
