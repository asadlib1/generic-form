import React from "react";
import "./App.css";
import Form from "./Form/components/Form";

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

function App() {
  return (
    <div className="App">
      <Form
        formData={inputData}
        validationData={myUserValidation}
        formTitle={"My Information"}
      />
    </div>
  );
}

export default App;
