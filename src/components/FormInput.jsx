import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const FormInput = () => {
  const { register, control, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      defaultValues: {
        clientName: "Jensen Huang",
        clientEmail: "jensenh@mail.com",
        status: "paid",
        createdAt: new Date(),
        paymentDue: new Date(),
        description: "Re-branding",
        senderAddress: {
          street: "",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom",
        },
        clientAddress: {
          street: "106 Kendell Street",
          city: "Sharrington",
          postCode: "NR24 5WQ",
          country: "United Kingdom",
        },
        items: [
          {
            name: "",
            quantity: 0,
            price: 0,
          },
        ],
      },
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const { errors, isValid, isDirty } = formState;
  const { append, remove, fields } = useFieldArray({
    name: "items",
    control,
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <h4>Bill From</h4>
          <div className="invoice-input">
            <label htmlFor="senderStreet">
              <span>Sender Address</span>
              <span className="error">
                {errors?.senderAddress?.street?.message}
              </span>
            </label>
            <input
              type="text"
              id="senderStreet"
              {...register("senderAddress.street", {
                required: {
                  value: true,
                  message: "can't be empty",
                },
              })}
            />
          </div>
          <div className="form-3-col">
            <div className="invoice-input">
              <label htmlFor="senderCity">
                <span>Sender City</span>
                <span className="error">
                  {errors?.senderAddress?.city?.message}
                </span>
              </label>
              <input
                type="text"
                id="senderCity"
                {...register("senderAddress.city", {
                  required: {
                    value: true,
                    message: "can't be empty",
                  },
                })}
              />
            </div>
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
                    value: /^\d{1,5}$/,
                    message: "Please enter a number",
                  },
                  maxLength: {
                    value: 5,
                    message: "Postal code must be 5 characters or less",
                  },
                })}
              />
            </div>
            <div className="invoice-input">
              <label htmlFor="senderCountry">
                <span>Country</span>
                <span className="error">
                  {errors?.senderAddress?.country?.message}
                </span>
              </label>
              <input
                type="text"
                id="senderCountry"
                {...register("senderAddress.country", {
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
                    value: /^\d{1,5}$/,
                    message: "Please enter a number",
                  },
                  maxLength: {
                    value: 5,
                    message: "Postal code must be 5 characters or less",
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
          <h4>Items</h4>
          {fields.map((field, index) => (
            <div key={field.id} className="form-3-col">
              <div className="invoice-input">
                <label htmlFor={`items.${index}.name`}>
                  <span>Item Name</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.name`}
                  {...register(`items.${index}.name`)}
                />
              </div>
              <div className="invoice-input">
                <label htmlFor={`items.${index}.quantity`}>
                  <span>Quantity</span>
                </label>
                <input
                  type="number"
                  id={`items.${index}.quantity`}
                  {...register(`items.${index}.quantity`)}
                />
              </div>
              <div className="invoice-input">
                <label htmlFor={`items.${index}.price`}>
                  <span>Price</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.price`}
                  {...register(`items.${index}.price`)}
                />
              </div>
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: "", quantity: 0, price: "" })}
          >
            Add Item
          </button>
        </div>

        <div className="btn-container">
          <div className="btn-discard">
            <button type="button" className="btn btn-discard">
              Discard
            </button>
          </div>
          <div className="btn-others">
            <button type="button" className="btn btn-draft">
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
