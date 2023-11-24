import React from "react";
import { DevTool } from "@hookform/devtools";
import { useGlobalContext } from "../Context";
import InvoiceInput from "./InvoiceInput";
const FormInput = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    insert,
    fields,
    watch,
    remove,
    onSubmit,
    saveAsDraft,
    handlePriceChange,
    handleQuantityChange,
    resetField,
  } = useGlobalContext();

  const { errors } = formState;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <h4>Bill From</h4>
          <InvoiceInput
            inputField="senderAddress.street"
            id="senderAddress"
            fieldName="Sender Address"
            message="can't be empty"
            errorMessage={errors?.senderAddress?.street?.message}
          />
          <div className="form-3-col">
            <InvoiceInput
              inputField="senderAddress.city"
              id="senderCity"
              message="can't be empty"
              fieldName="Sender City"
              errorMessage={errors?.senderAddress?.city?.message}
            />

            <div className="invoice-input">
              <label htmlFor="senderPostcode">
                <span>Post code</span>
                <span className="error">
                  {errors?.senderAddress?.postCode?.message}
                </span>
              </label>
              <input
                type="text"
                id="senderPostcode"
                {...register("senderAddress.postCode", {
                  // valueAsNumber: true,
                  required: {
                    value: true,
                    message: "can't be empty",
                  },

                  pattern: {
                    value: /^\d{1,6}$/,
                    message: "Please enter a number",
                  },
                  maxLength: {
                    value: 6,
                    message: "Postal code must be 6 characters or less",
                  },
                })}
              />
            </div>
            <InvoiceInput
              inputField="senderAddress.country"
              id="senderCountry"
              message="can't be empty"
              fieldName="Country"
              errorMessage={errors?.senderAddress?.country?.message}
            />
          </div>
        </div>
        <div className="form-control">
          <InvoiceInput
            inputField="clientName"
            id="client name"
            message="can't be empty"
            fieldName="Client Name"
            errorMessage={errors?.clientName?.message}
          />
        </div>
        <div className="form-control">
          <div className="invoice-input">
            <label htmlFor="clientEmail">client email</label>
            <input
              type="text"
              id="clientEmail"
              {...register("clientName", {
                required: { value: true, message: "can't be empty" },
              })}
            />
            <span className="error">{errors?.clientName?.message}</span>
          </div>
        </div>
        <div className="form-control">
          <h4>Bill to</h4>
          <div className="invoice-input">
            <label htmlFor="clientStreet">
              <span>Address</span>
              <span className="error">
                {errors?.clientAddress?.street?.message}
              </span>
            </label>
            <input
              type="text"
              id="clientStreet"
              {...register("clientAddress.street", {
                required: {
                  value: true,
                  message: "can't be empty",
                },
              })}
            />
          </div>
          <div className="form-3-col">
            <div className="invoice-input">
              <label htmlFor="clientCity">
                <span>city</span>
                <span className="error">
                  {errors?.clientAddress?.city?.message}
                </span>
              </label>
              <input
                type="text"
                id="clientCity"
                {...register("clientAddress.city", {
                  required: {
                    value: true,
                    message: "can't be empty",
                  },
                })}
              />
            </div>
            <div className="invoice-input">
              <label htmlFor="clientPostCode">
                <span>Post code</span>
                <span className="error">
                  {errors?.clientAddress?.postCode?.message}
                </span>
              </label>
              <input
                type="text"
                id="clientPostCode"
                {...register("clientAddress.postCode", {
                  required: {
                    value: true,
                    message: "can't be empty",
                  },

                  pattern: {
                    value: /^\d{1,6}$/,
                    message: "Please enter a number",
                  },
                  maxLength: {
                    value: 6,
                    message: "Postal code must be 6 characters or less",
                  },
                })}
              />
            </div>
            <div className="invoice-input">
              <label htmlFor="clientCountry">
                <span>country</span>
                <span className="error">
                  {errors?.clientAddress?.country?.message}
                </span>
              </label>
              <input
                type="text"
                id="clientCountry"
                {...register("clientAddress.country", {
                  required: {
                    value: true,
                    message: "can't be empty",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="form-2-col">
            <InvoiceInput
              inputField="createdAt"
              id="createdAt"
              message="can't be empty"
              fieldName="Invoice Date"
              errorMessage={errors?.createdAt?.message}
              type="date"
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
                <option value="7 days">Next 7 Days</option>
                <option value="14 days">Next 14 Days</option>
                <option value="30 days">Next 30 Days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-control">
          <h4>Items</h4>
          {fields.map((field, index) => (
            <div key={field.id} className="form-4-col">
              <InvoiceInput
                inputField={`items.${index}.name`}
                id={`items.${index}.name`}
                message="item name required"
                fieldName="Item"
                errorMessage={errors?.items?.[index]?.name?.message}
                type="text"
              />
              <InvoiceInput
                inputField={`items.${index}.quantity`}
                id={`items.${index}.quantity`}
                message="specify quantity"
                fieldName="Qty"
                errorMessage={errors?.items?.[index]?.quantity?.message}
                type="text"
                validationRules={{
                  pattern: {
                    value: /^\d{1,5}$/,
                    message: "Please enter a number",
                  },
                }}
                onChangeHandler={(e) =>
                  handleQuantityChange(index, e.target.value)
                }
              />

              <InvoiceInput
                inputField={`items.${index}.price`}
                id={`items.${index}.price`}
                message="specify price"
                fieldName="Price"
                errorMessage={errors?.items?.[index]?.price?.message}
                type="text"
                validationRules={{
                  pattern: {
                    value: /^\d{1,5}$/,
                    message: "Please enter a number",
                  },
                }}
                onChangeHandler={(e) =>
                  handlePriceChange(index, e.target.value)
                }
              />
              <InvoiceInput
                inputField={`items.${index}.total`}
                id={`items.${index}.total`}
                fieldName="Total"
                type="number"
                handleValue={watch(`items.${index}.total`, 0)}
                readOnly
              />

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
          ))}
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
