import React from "react";
import { useGlobalContext } from "../Context";

const FormInput = ({
  labelInfo,
  name,

  inputType = "text",
}) => {
  const { inputData, handleInputChange } = useGlobalContext();

  return (
    <div className="invoice-input">
      <label>{labelInfo}</label>
      <input
        name={name}
        value={inputData[name]}
        onChange={handleInputChange}
        type={inputType}
      />
    </div>
  );
};

export default FormInput;
