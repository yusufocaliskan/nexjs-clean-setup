import LoadingGif from '@/components/LoadingGif';
import './index.scss';
import {useEffect, useState} from 'react';

const FormTriggerButton = ({disabled, formInstance, isLoading = false, label}) => {
  return (
    <>
      <div className=" form-trigger-button-wrapper">
        <button disabled={disabled || !formInstance.isValid} type="submit" className="btn-main  form-trigger-button">
          {isLoading ? <LoadingGif isPuff color="white" /> : label}
        </button>
      </div>
    </>
  );
};

export default FormTriggerButton;
