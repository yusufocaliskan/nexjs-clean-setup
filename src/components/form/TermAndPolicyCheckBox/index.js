import { CheckBox } from "@/components";
import "./stye.scss";

const TermAndPolicyCheckBox = ({ value, setValue, name, formInstance }) => {
  return (
    <CheckBox
      formInstance={formInstance}
      name={name}
      value={value}
      setValue={setValue}
      rightSideText={
        <p class="fontSize13 lh12">
          <label for="agreement" class="form-check-label">
            I have read and accept.
          </label>{" "}
          <span class="text-warning-custom">(</span>{" "}
          <a
            href="/en/contracts/user-agreement"
            class="text-warning-custom"
            target="_blank"
          >
            Terms of Use
          </a>
          ,
          <a
            href="/en/contracts/privacy-policy"
            class="text-warning-custom"
            target="_blank"
          >
            Privacy Policy
          </a>
          ,
          <a
            href="/en/contracts/aml-kyc-policy"
            class="text-warning-custom"
            target="_blank"
          >
            AML/KYC Policy
          </a>
          ,
          <a
            href="/en/contracts/risk-disclosure-statement"
            class="text-warning-custom"
            target="_blank"
          >
            Risk Declaration
          </a>
          ,
          <a
            href="/en/contracts/clarification-text-for-website-users"
            class="text-warning-custom"
            target="_blank"
          >
            Clarification Text
          </a>{" "}
          and
          <a
            href="/en/contracts/consent-text-for-website-users"
            class="text-warning-custom"
            target="_blank"
          >
            Consent Text
          </a>{" "}
          <span class="text-warning-custom">)</span>
        </p>
      }
    />
  );
};

export default TermAndPolicyCheckBox;
