import React, { useState } from "react";

import { TFormDataProp, TFormSubmitCallback } from "../types";

import {
  formatErrorsFromData,
  formatFormInputValues,
  formatFormResponseData,
  getValidationData,
} from "../utils";

const useFormHook = (
  initialState: TFormDataProp,
  formCallback: TFormSubmitCallback
) => {
  const [inputValues, setInputValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = event.target;
    setInputValues(formatFormInputValues(inputValues, inputName, inputValue));
  };

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formResponseData = formatFormResponseData(inputValues);
    const formData = getValidationData(inputValues);
    const formValidity = await formData.isValid(formResponseData, {
      abortEarly: false,
    });
    if (formValidity) {
      setErrors({});
      formCallback(formResponseData);
    } else {
      formData
        .validate(formResponseData, { abortEarly: false })
        .catch((err: any) => {
          const errors = formatErrorsFromData(err);
          setErrors((previousErrors) => ({ ...previousErrors, ...errors }));
        });
    }
  };

  return {
    inputValues,
    errors,
    formSubmitHandler,
    onChange,
  };
};

export default useFormHook;
