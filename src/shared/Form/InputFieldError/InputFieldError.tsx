import React from "react";

import type { TInputError } from "../types";

interface IInputFieldError {
  error: TInputError;
}

const InputFieldError: React.FC<IInputFieldError> = ({ error }) => (
  <div style={{ color: "red", width: "300px", textAlign: "center" }}>
    {error}
  </div>
);

export default InputFieldError;
