import React from "react";
import { useGlobalContext } from "../Context";

const InvoiceInput = ({
  inputField,
  id,
  message,
  errorMessage,
  fieldName,
  validationRules,
  onChangeHandler,
  handleValue,
  readOnly,
  type = "text",
}) => {
  const { register } = useGlobalContext();
  return (
    <>
      <div className="invoice-input">
        <label htmlFor={id}>
          <span>{fieldName}</span>
          <span className="error">{errorMessage}</span>
        </label>
        <input
          type={type}
          id={id}
          {...register(`${inputField}`, {
            required: {
              value: true,
              message: `${message}`,
            },
            ...validationRules,
          })}
          onChange={onChangeHandler}
          value={handleValue}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default InvoiceInput;
