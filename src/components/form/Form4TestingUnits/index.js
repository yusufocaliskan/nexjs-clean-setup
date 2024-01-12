import {useTranslation} from '@/app/i18n/client';
import {FormTriggerButton} from '@/components';

const Form4TestingUnits = ({id, children, submitButtonText = 'Custom Text'}) => {
  const {t} = useTranslation();

  //set a max post request
  const handleOnTestingSubmition = async () => {
    console.log('The testing form worked');
    return await Promise.resolve(true);
  };

  return (
    <>
      <div>
        <form data-testid={id} onSubmit={handleOnTestingSubmition}>
          {children}
          <FormTriggerButton />
        </form>
      </div>
    </>
  );
};

export default Form4TestingUnits;
