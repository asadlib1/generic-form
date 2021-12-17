import { FC } from "react";
import { useForm } from "../hooks/useForm";
import "./Form.scss";

type MyUser = {
  name: string;
  age: number;
  password: string;
};

interface IFormData {
  field: string;
  value?: string;
  type: string;
  required: boolean;
  placeholder: string;
}

const myUserValidation = {
  name: {
    pattern: {
      value: "^[A-Za-z]*$",
      message:
        "You're not allowed to use special characters or numbers in your name.",
    },
  },
  age: {
    custom: {
      isValid: (value: string) => parseInt(value, 10) > 17,
      message: "You have to be at least 18 years old.",
    },
  },
  password: {
    custom: {
      isValid: (value: string) => value.length > 6,
      message: "The password needs to be at least 6 characters long.",
    },
  },
};

const inputData: IFormData[] = [
  {
    field: "name",
    placeholder: "Name",
    required: true,
    type: "text",
  },
  {
    field: "age",
    placeholder: "age",
    required: true,
    type: "number",
  },
  {
    field: "password",
    placeholder: "Password",
    required: true,
    type: "password",
  },
];

const Form: FC = () => {
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<MyUser>({
    validations: myUserValidation,
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
      <h1>Registration</h1>
      {inputData.map(({ type, required, field, value, placeholder }) => {
        return (
          <>
            <input
              placeholder={placeholder}
              name={field}
              value={user[field as keyof MyUser] || ""}
              onChange={handleChange(field as keyof MyUser)}
              required={required}
              type={type}
            />
            {errors[field as keyof MyUser] && (
              <p className="error">{errors[field as keyof MyUser]}</p>
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
