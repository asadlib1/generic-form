import { FC } from "react";
import { useForm } from "../hooks/useForm";
import "./Form.scss";

interface IFormProps {
  formData: any[];
  validationData: any;
  formTitle?: string;
}

const Form: FC<IFormProps> = ({ validationData, formData, formTitle }) => {
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<any>({
    validations: validationData,
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
      {formTitle && <h1>{formTitle}</h1>}
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
