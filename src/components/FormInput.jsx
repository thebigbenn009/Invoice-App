import React from "react";
import { useGlobalContext } from "../Context";

const FormInput = ({ labelInfo }) => {
  return (
    <div className="invoice-input">
      <label>{labelInfo}</label>
      <input />
    </div>
  );
};

export default FormInput;
