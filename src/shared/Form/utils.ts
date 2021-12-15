import * as yup from "yup";

import { TFormDataProp, TFormInputValue, TFormResponseData } from "./types";

/**
 *
 * @param inputFields : TFormDataProp type
 * @returns validation schema with validations applied using yup
 */

export const getValidationData = (inputFields: any) => {
  const validationData = inputFields.reduce(
    (validationData: any, inputField: any) => {
      const {
        name,
        validationType,
        validationTypeError,
        validations = [],
      } = inputField;
      const isObject = name.indexOf(".") >= 0;

      if (!yup[validationType]) {
        return validationData;
      }
      let validator = yup[validationType]().typeError(
        validationTypeError || ""
      );
      validations.forEach((validation) => {
        const { params, type } = validation;
        if (!validator[type]) {
          return;
        }
        validator = validator[type](...params);
      });

      if (!isObject) {
        return validationData.concat(yup.object().shape({ [name]: validator }));
      }

      const reversePath = name.split(".").reverse();
      const currNestedObject = reversePath.slice(1).reduce(
        (yupObj, path) => {
          if (!isNaN(path)) {
            return { array: yup.array().of(yup.object().shape(yupObj)) };
          }
          if (yupObj.array) {
            return { [path]: yupObj.array };
          }
          return { [path]: yup.object().shape(yupObj) };
        },
        { [reversePath[0]]: validator }
      );

      const newSchema = yup.object().shape(currNestedObject);
      return validationData.concat(newSchema);
    },
    yup.object().shape({})
  );

  return validationData;
};

/**
 *
 * @param formData
 * @param inputName
 * @param inputValue
 * @returns formatted input values of form
 */
export const formatFormInputValues = (
  formData: TFormDataProp,
  inputName: string,
  inputValue: TFormInputValue
) =>
  formData.map((el) => {
    if (el.name === inputName) {
      return {
        ...el,
        value: inputValue,
      };
    }

    return el;
  });

/**
 *
 * @param data
 * @returns formatted data response
 */
export const formatFormResponseData = (data: any): TFormResponseData =>
  data.reduce((accumulator: any, el: any) => {
    return {
      ...accumulator,
      [el.name]: el.value,
    };
  }, []);

/**
 *
 * @param err
 * @returns formats all the errors
 */
export const formatErrorsFromData = (err: any): { [key: string]: string[] } =>
  err.inner.reduce((accumulator: any, error: any) => {
    return {
      ...accumulator,
      [error.path]: err?.errors,
    };
  }, {});
