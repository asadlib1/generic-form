import React from "react";
import { InputFieldError } from "../InputFieldError";
import { TFormInputValue, TInputType, TInputErrors } from "../types";

interface IInputField {
  value?: TFormInputValue;
  type?: TInputType;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: TInputErrors;
}

const InputField: React.FC<IInputField> = ({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        id={name}
      />
      {errors &&
        errors?.length > 0 &&
        errors.map((error, index) => (
          <InputFieldError key={`error${index}`} error={error} />
        ))}
    </div>
  );
};
