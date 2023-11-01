import React from "react";

const FormInput = ({ labelInfo, inputType = "text" }) => {
  return (
    <div className="invoice-input">
      <label>{labelInfo}</label>
      <input type={inputType} />
    </div>
  );
};

export default FormInput;
