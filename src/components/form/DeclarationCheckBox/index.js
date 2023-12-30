import { CheckBox } from "@/components";
import "./stye.scss";

const DeclarationCheckBox = ({ value, setValue, name, formInstance }) => {
  return (
    <CheckBox
      formInstance={formInstance}
      name={name}
      value={value}
      setValue={setValue}
      rightSideText={
        <span>
          I agree to receive commercial electronic messages via e-mail and
          telephone within the scope of{" "}
          <a
            href="/en/contracts/clarification-text-for-website-visitors"
            class="text-warning-custom"
            place="kvkkLink"
            target="_blank"
          >
            Informative Fact Sheet
          </a>{" "}
          regarding products and services.
        </span>
      }
    />
  );
};

export default DeclarationCheckBox;
