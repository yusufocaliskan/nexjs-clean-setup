import { Form, VerificationCode, CoolButton } from "@/components";
const VerificationForm = ({
  formInstance,
  descriptionText,
  onClickResenButton,
  counter,
  t,
}) => {
  let label = t("resendCode");
  if (counter.isCounterStarted) {
    label = `${t("wait")} (${counter.counter})`;
  }
  return (
    <Form
      formInstance={formInstance}
      submitButtonText={t("continue")}
      dontDisplayErrors
      dontDisplayCaptcha
    >
      <div className="login-form">
        <div className="form-inputs">
          <div className="text-align-center">
            <p dangerouslySetInnerHTML={{ __html: descriptionText }} />
          </div>

          <div className="verification-div">
            <VerificationCode
              formInstance={formInstance}
              verificationCode={formInstance.values.Token}
              name="Token"
              setVerificationCode={(value) =>
                formInstance.setFieldValue("Token", value)
              }
            />
          </div>
          <div className="input-groups">
            <CoolButton
              label={label}
              type="Small"
              onClick={!counter.isCounterStarted ? onClickResenButton : null}
              disabled={counter.isCounterStarted}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
export default VerificationForm;
