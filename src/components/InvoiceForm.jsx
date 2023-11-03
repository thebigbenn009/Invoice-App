import React, { useState } from "react";
import FormInput from "./FormInput";
import AddNewItem from "./AddNewItem";
import { useGlobalContext } from "../Context";

const InvoiceForm = ({ inputType }) => {
  const { handleSubmitBtn, formData, handleAddNewItem } = useGlobalContext();
  const {
    senderAddress,
    clientAddress,
    clientName,
    clientEmail,
    paymentTerms,
    description,
    items,
  } = formData;
  return (
    <form>
      <div className="form-control">
        <h4>bill from</h4>
        <FormInput labelInfo="Street Address" name="senderAddress.street" />

        <div className="form-3-col">
          <FormInput
            name="senderAddress.city"
            labelInfo="City"
            inputType={inputType}
          />
          <FormInput name="senderAddress.postCode" labelInfo="Post Code" />
          <FormInput name="senderAddress.country" labelInfo="Country" />
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
          name="clientAddress.street"
          labelInfo="Street Address"
          inputType={inputType}
        />
        <div className="form-3-col">
          <FormInput
            name="clientAddress.city"
            labelInfo="City"
            inputType={inputType}
          />
          <FormInput name="clientAddress.postCode" labelInfo="Post Code" />
          <FormInput name="clientAddress.country" labelInfo="Country" />
        </div>
      </div>
      <div className="form-control">
        <div className="form-2-col">
          <FormInput
            name="formData.createdAt"
            labelInfo="Invoice Date"
            inputType="date"
          />
          <div className="invoice-input">
            <label htmlFor="formData.paymentTerms">payment terms</label>
            <select name="formData.paymentTerms">
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
          name="formData.description"
          labelInfo="Project Description"
          inputType={inputType}
        />
        <div className="form-control">
          <h4>Item List</h4>
          <div className="new-item-container">
            {items.map((item, index) => {
              const { name, quantity, price } = item;
              return (
                <AddNewItem
                  key={index}
                  // itemIndex={index}
                  // name={name}
                  // quantity={quantity}
                  // price={price}
                />
              );
            })}
          </div>
          <button
            type="submit"
            onClick={handleAddNewItem}
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
            <button className="btn btn-send" onClick={handleSubmitBtn}>
              Save & send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
