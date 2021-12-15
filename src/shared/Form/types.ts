// Basic form data model
export type TFormDataProp = TFormDataObject[];
export type TFormDataObject = {
  name: string;
  label?: string;
  value?: TFormInputValue;
  validationType?: string;
  validations?: TFormInputValidation[];
};

// Input type
export type TInputType = "text"; // can be made generic for future
export type TFormInputValue = string | number; // Default value provided by user to the input

// Validation type
export type TFormInputValidation = {
  type: string;
  params: (string | number)[];
};

// Error type
export type TInputError = string; // error message to be shown with the label
export type TInputErrors = TInputError[];

// Submission callback type
export type TFormSubmitCallback = (data: TFormResponseData) => void;
export type TFormResponseData = { [key: string]: unknown }[];
