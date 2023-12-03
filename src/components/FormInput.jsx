import React from "react";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useGlobalContext } from "../Context";
import InvoiceInput from "./InvoiceInput";
import { calculateDueDate } from "../utils";
import { useNavigate } from "react-router-dom";
const countryAPI = `https://restcountries.com/v3.1/name/{name}?fullText=true`;
const FormInput = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    errors,
    insert,
    fields,
    watch,
    remove,
    onSubmit,
    saveAsDraft,
    handlePriceChange,
    handleQuantityChange,
    resetField,
    isSubmitted,
    singleInvoice,
  } = useGlobalContext();

  useEffect(() => {
    if (isSubmitted) {
      console.log(isSubmitted);
      navigate("/");
    }
  }, [isSubmitted]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <h4>Bill From</h4>

          <InvoiceInput
            inputField="senderAddress.street"
            id="senderAddress.street"
            message="can't be empty"
            fieldName="Sender Street"
            errorMessage={errors?.senderAddress?.street?.message}
          />
        </div>
        <div className="form-3-col">
          <div className="form-control">
            <InvoiceInput
              inputField="senderAddress.city"
              id="senderCity"
              message="can't be empty"
              fieldName="Sender City"
              errorMessage={errors?.senderAddress?.city?.message}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="senderAddress.postCode"
              id="senderPostCode"
              message="can't be empty"
              fieldName="Post code"
              errorMessage={errors?.senderAddress?.postCode?.message}
              // validationRules={{
              //   pattern: {
              //     value: /^\d{1,6}$/,
              //     message: "Please enter a number",
              //   },
              //   maxLength: {
              //     value: 6,
              //     message: "Postal code must be 6 characters or less",
              //   },
              // }}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="senderAddress.country"
              id="senderCountry"
              message="can't be empty"
              fieldName="country"
              errorMessage={errors?.senderAddress?.country?.message}
            />
          </div>
        </div>
        <div className="form-control">
          <h4>Bill to</h4>
          <div className="form-control">
            <InvoiceInput
              inputField="clientName"
              id="clientName"
              message="can't be empty"
              fieldName="Client's Name"
              errorMessage={errors?.clientName?.message}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="clientEmail"
              id="clientEmail"
              message="can't be empty"
              fieldName="Client's Email"
              errorMessage={errors?.clientEmail?.message}
              validationRules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="clientAddress.street"
              id="clientStreet"
              message="can't be empty"
              fieldName="Client Street"
              errorMessage={errors?.clientAddress?.street?.message}
            />
          </div>
        </div>
        <div className="form-3-col">
          <div className="form-control">
            <InvoiceInput
              inputField="clientAddress.city"
              id="clientCity"
              message="can't be empty"
              fieldName="Client city"
              errorMessage={errors?.clientAddress?.city?.message}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="clientAddress.postCode"
              id="clientPostCode"
              message="can't be empty"
              fieldName="Post Code"
              errorMessage={errors?.clientAddress?.postCode?.message}
            />
          </div>
          <div className="form-control">
            <InvoiceInput
              inputField="clientAddress.country"
              id="clientCountry"
              message="can't be empty"
              fieldName="Client country"
              errorMessage={errors?.clientAddress?.country?.message}
              validationRules={{
                validate: {
                  validateCountryName: async (fieldValue) => {
                    const response = await fetch(
                      `https://restcountries.com/v3.1/name/${fieldValue}?fullText=true`
                    );
                    const data = await response.json();
                    return data.length > 0 || "invalid country";
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="form-2-col">
          <InvoiceInput
            inputField="createdAt"
            type="date"
            id="createdAt"
            message="can't be empty"
            fieldName="Invoice Date"
            errorMessage={errors?.createdAt?.message}
          />
          <div className="invoice-input">
            <label htmlFor="paymentDue">
              <span>Payment Terms</span>
              <span className="error">{errors?.paymentDue?.message}</span>
            </label>
            <select
              {...register("paymentDue", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              id=""
            >
              <option value="">Payment Terms</option>
              <option value={calculateDueDate("1")}>Next 1 Day</option>
              <option value={calculateDueDate("7")}>Next 7 Days</option>
              <option value={calculateDueDate("14")}>Next 14 Days</option>
              <option value={calculateDueDate("30")}>Next 30 Days</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <InvoiceInput
            inputField="description"
            type="text"
            id="description"
            message="can't be empty"
            fieldName="Project Description"
            errorMessage={errors?.description?.message}
          />
        </div>
        <div className="form-control">
          <h4>Items</h4>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="form-4-col">
                <div className="invoice-input">
                  <label htmlFor="name">
                    <span>Item</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register(`items.${index}.name`, {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  <span className="error">
                    {errors?.items?.[index]?.name?.message}
                  </span>
                </div>
                <div className="invoice-input">
                  <label htmlFor="quantity">
                    <span>Qty</span>
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    {...register(`items.${index}.quantity`, {
                      required: {
                        value: true,
                        message: "required",
                      },
                      pattern: {
                        value: /^\d{1,5}$/,
                        message: "Please enter a number",
                      },
                    })}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                  <span className="error">
                    {errors?.items?.[index]?.quantity?.message}
                  </span>
                </div>
                <div className="invoice-input">
                  <label htmlFor="price">
                    <span>Price</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    {...register(`items.${index}.price`, {
                      required: {
                        value: true,
                        message: "required",
                      },
                      pattern: {
                        value: /^\d{1,5}$/,
                        message: "Please enter a number",
                      },
                    })}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                  <span className="error">
                    {errors?.items?.[index]?.price?.message}
                  </span>
                </div>
                <div className="invoice-input">
                  <label htmlFor="total">
                    <span>Total</span>
                  </label>
                  <input
                    type="number"
                    readOnly
                    id="total"
                    {...register(`items[${index}].total`)}
                    value={watch(`items.${index}.total`, 0)}
                  />
                </div>
                <svg
                  className="remove-item"
                  onClick={() => remove(index)}
                  width="13"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                    fill="#888EB0"
                    fill-rule="nonzero"
                  />
                </svg>
              </div>
            );
          })}
          <div>
            <button
              className="btn  btn-add"
              type="button"
              onClick={() => {
                insert(0, {
                  name: "",
                  quantity: "",
                  price: "",
                  total: 0,
                });
              }}
            >
              <strong>+</strong> Add New Item
            </button>
          </div>
        </div>
        <div className="btn-container">
          <div className="btn-discard">
            <button
              onClick={resetField}
              type="button"
              className="btn btn-discard"
            >
              Discard
            </button>
          </div>
          <div className="btn-others">
            <button
              onClick={saveAsDraft}
              type="button"
              className="btn btn-draft"
            >
              Save as Draft
            </button>
            <button type="submit" className="btn btn-send">
              Save & send
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormInput;
