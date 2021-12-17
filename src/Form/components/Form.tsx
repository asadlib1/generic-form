import { FC } from "react";
import { useForm } from "../hooks/useForm";
import "./Form.scss";
export interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

export interface IFormFieldsData {
  field: string;
  value?: string;
  type: string;
  required: boolean;
  placeholder: string;
}

interface IFormProps {
  formData: IFormFieldsData[];
  validationSchema: Partial<Record<keyof any, Validation>>;
  title?: string;
}

const Form: FC<IFormProps> = ({ validationSchema, formData, title }) => {
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<any>({
    validations: validationSchema,
    onSubmit: () => alert("User submitted!"),
  });

  return (
    <form
      className="registration-wrapper"
      onSubmit={(e) => {
        handleSubmit(e);
        console.log("Data", user);
      }}
    >
      {title && <h1>{title}</h1>}
      {formData.map(({ type, required, field, value, placeholder }) => {
        return (
          <>
            <input
              placeholder={placeholder}
              name={field}
              value={user[field as keyof any] || ""}
              onChange={handleChange(field as keyof any)}
              required={required}
              type={type}
            />
            {errors[field as keyof any] && (
              <p className="error">{errors[field as keyof any]}</p>
            )}
          </>
        );
      })}
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
