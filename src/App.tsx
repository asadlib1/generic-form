import React from "react";
import "./App.css";
import Form, { Validation, IFormFieldsData } from "./Form/components/Form";

const validationSchema: Partial<Record<keyof any, Validation>> = {
  firstName: {
    pattern: {
      value: "^[A-Za-z]*$",
      message:
        "You cannot enter Spaces, special characters or numbers in your first name.",
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
      message: "Password needs to be at least 7 characters long.",
    },
  },
};

const inputData: IFormFieldsData[] = [
  {
    field: "firstName",
    placeholder: "First Name",
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
        validationSchema={validationSchema}
        title={"My Information"}
      />
    </div>
  );
}

export default App;
