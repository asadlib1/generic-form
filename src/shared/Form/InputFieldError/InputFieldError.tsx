import React from "react";

import type { TInputError } from "../types";

interface IInputFieldError {
  error: TInputError;
}

const InputFieldError: React.FC<IInputFieldError> = ({ error }) => (
  <div>{error}</div>
);

export default InputFieldError;
