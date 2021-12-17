# Generic Form

This project is an implementation for a generic form that consists of inputs of type texts, numbers, or password. You can import the Form in any component in app and provide props of appropriate types inorder to use it.

#

## API


Props:
<table>
    <tr>
        <th>Prop</th>
        <th>Type</th>
    </tr>
    <tr>
        <td>title</td>
        <td>string</td>
    </tr>
    <tr>
        <td>validationSchema</td>
        <td>Partial< Record < keyof any, Validation>></td>
    </tr>
    <tr>
        <td>formData</td>
        <td>IFormFieldsData[]</td>
    </tr>
</table>

Validation Interface: 
<pre>
interface Validation {
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
</pre>

<table>
    <tr>
        <th>Validation Type</th>
        <th>Usage</th>
    </tr>
    <tr>
        <td>required</td>
        <td>You can add required object to your field's schema in order to make is necessary field</td>
    </tr>
    <tr>
        <td>pattern</td>
        <td>You can use pattern to add a regex pattern to match the input</td>
    </tr>
    <tr>
        <td>custom</td>
        <td>You can add a custom method on input string to perform validations like min value, max value</td>
    </tr>
</table>

IFormFieldsData interface 
<pre>
interface IFormFieldsData {
  field: string;  // fields are used in validation schemas so it should not have spaces
  value?: string;
  type: string;
  required: boolean;
  placeholder: string;
}
</pre>

## Usage

As you have seen the above interfaces you can use the form component as following example given in App.ts:

<pre>
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

    < Form
        formData={inputData}
        validationSchema={validationSchema}
        title={"My Information"}
    />

</pre>
## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

