import React, { useState } from "react";
import FormInput from "./FormInput";
import AddNewItem from "./AddNewItem";
import { useGlobalContext } from "../Context";

const InvoiceForm = ({ inputType }) => {
  const { handleSubmitBtn } = useGlobalContext();
  return (
    <form>
      <div className="form-control">
        <h4>bill from</h4>
        <FormInput labelInfo="Street Address" name="billerAddress" />
        <div className="form-3-col">
          <FormInput name="billerCity" labelInfo="City" inputType={inputType} />
          <FormInput name="billerPostCode" labelInfo="Post Code" />
          <FormInput name="billerCountry" labelInfo="Country" />
        </div>
      </div>
      <div className="form-control">
        <h4>bill to</h4>
        <FormInput name="clientName" labelInfo="Client’s Name" />
        <FormInput
          name="clientEmail"
          labelInfo="Client’s Email"
          inputType="email"
        />
        <FormInput
          name="clientAddress"
          labelInfo="Street Address"
          inputType={inputType}
        />
        <div className="form-3-col">
          <FormInput name="clientCity" labelInfo="City" inputType={inputType} />
          <FormInput name="clientPostCode" labelInfo="Post Code" />
          <FormInput name="clientCountry" labelInfo="Country" />
        </div>
      </div>
      <div className="form-control">
        <div className="form-2-col">
          <FormInput
            name="invoiceDate"
            labelInfo="Invoice Date"
            inputType="date"
          />
          <div className="invoice-input">
            <label htmlFor="payment terms">payment terms</label>
            <select name="payment-terms" id="">
              <option value="1 week">1 week</option>
              <option value="10 days">10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="custom">custom</option>
            </select>
            {/* <FormInput labelInfo="payment terms" inputType="date" /> */}
          </div>
        </div>
        <FormInput
          name="projectDescription"
          labelInfo="Project Description"
          inputType={inputType}
        />
        <div className="form-control">
          <h4>Item List</h4>
          <div className="new-item-container">
            <AddNewItem />
            <AddNewItem />
          </div>
          <button
            type="submit"
            onClick={handleSubmitBtn}
            className="btn btn-add"
          >
            Add New Item <strong>+</strong>
          </button>
        </div>
        <div className="btn-container">
          <div className="btn-discard">
            <button className="btn btn-discard">Discard</button>
          </div>
          <div className="btn-others">
            <button className="btn btn-draft">Save as Draft</button>
            <button className="btn btn-send">Save & send</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
