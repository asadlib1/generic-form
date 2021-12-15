import React from "react";

import { InputField } from "./InputField";
import type { TFormDataProp, TFormSubmitCallback } from "./types";
import { formHooks } from "./hooks";

interface IForm {
  onSubmit: TFormSubmitCallback;
  formData: TFormDataProp;
}

const Form: React.FC<IForm> = ({ onSubmit, formData }) => {
  const { onChange, formSubmitHandler, inputValues, errors } =
    formHooks.useformHook(formData, onSubmit);

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      {inputValues.map((formElement) => (
        <InputField
          key={formElement.name}
          name={formElement.name}
          label={formElement?.label}
          value={formElement?.value}
          onChange={onChange}
          errors={errors[formElement.name]}
        />
      ))}
      <input type="submit" value="Submit Form" />
    </form>
  );
};

export default Form;
