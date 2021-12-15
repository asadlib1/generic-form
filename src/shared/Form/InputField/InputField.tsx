import React, { memo } from "react";
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
    <div style={{ margin: "10px" }}>
      <label
        htmlFor={name}
        style={{ display: "block", width: "300px", textAlign: "center" }}
      >
        {label}
      </label>
      <input
        style={{
          width: "300px",
        }}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        id={name}
      />
      {errors &&
        errors?.length &&
        errors.map((error, index) => (
          <InputFieldError key={`error${index}`} error={error} />
        ))}
    </div>
  );
};

export default memo(InputField);
