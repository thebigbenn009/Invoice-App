import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const FormInput = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
  } = useForm({
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
          quantity: "",
          price: "",
          // totalAmount: 0,
        },
      ],
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const { errors, isValid, isDirty } = formState;
  const { append, remove, fields, insert } = useFieldArray({
    name: "items",
    control,
  });
  // Function to update total amount when quantity or price changes
  const calculateTotalAmount = (index) => {
    const quantity = getValues(`items.${index}.quantity`);
    const price = getValues(`items.${index}.price`);
    if (quantity && price) {
      const totalAmount = parseFloat(quantity) * parseFloat(price);
      console.log(totalAmount);
      setValue(`items.${index}.totalAmount`, totalAmount.toFixed(2));
    } else {
      setValue(`items.${index}.totalAmount`, "");
    }
  };

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
            <div key={field.id} className="form-4-col">
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
                  onChange={() => calculateTotalAmount(index)}
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
                  onChange={() => calculateTotalAmount(index)}
                />
              </div>
              <div className="invoice-input">
                <label htmlFor={`items.${index}.totalAmount`}>
                  <span>Total Amount</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.totalAmount`}
                  {...register(`items.${index}.totalAmount`)}
                  readOnly
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
          ))}
          <div>
            <button
              className="btn"
              type="button"
              onClick={() =>
                insert(0, {
                  name: "",
                  quantity: "",
                  price: "",
                  totalAmount: "",
                })
              }
            >
              Add Item
            </button>
          </div>
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
