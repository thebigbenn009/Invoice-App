import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const FormInput = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,

    setValue,
    watch,
  } = useForm({
    // defaultValues: {
    //   clientName: "Jensen Huang",
    //   clientEmail: "jensenh@mail.com",
    //   status: "paid",
    //   createdAt: new Date(),
    //   paymentDue: new Date(),
    //   description: "Re-branding",
    //   senderAddress: {
    //     street: "",
    //     city: "London",
    //     postCode: "E1 3EZ",
    //     country: "United Kingdom",
    //   },
    //   clientAddress: {
    //     street: "106 Kendell Street",
    //     city: "Sharrington",
    //     postCode: "NR24 5WQ",
    //     country: "United Kingdom",
    //   },
    //   items: [
    //     {
    //       name: "",
    //       quantity: "",
    //       price: "",
    //       // totalAmount: 0,
    //     },
    //   ],
    // },
  });
  const saveAsDraft = (data) => {
    console.log(data);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const { errors } = formState;
  const { remove, fields, insert } = useFieldArray({
    name: "items",
    control,
  });
  //function to handle price change and update total dynamically
  const handlePriceChange = (index, value) => {
    setValue(`items.${index}.price`, value, { shouldValidate: true });
    const quantity = watch(`items.${index}.quantity`);
    if (quantity !== undefined) {
      setValue(`items.${index}.total`, value * quantity);
    }
  };
  //function to handle quantity change and update total dynamically
  const handleQuantityChange = (index, value) => {
    setValue(`items.${index}.quantity`, value, { shouldValidate: true });
    const price = watch(`items.${index}.price`);
    if (price !== undefined) {
      setValue(`items.${index}.total`, value * price);
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
          <div className="invoice-input">
            <label htmlFor="clientName">client name</label>
            <input
              type="text"
              id="clientName"
              {...register("clientName", {
                required: { value: true, message: "can't be empty" },
              })}
            />
            <span className="error">{errors?.clientName?.message}</span>
          </div>
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
            <div className="invoice-input">
              <label htmlFor="createdAt">
                <span>Invoice Date</span>
                <span className="error">{errors?.createdAt?.message}</span>
              </label>
              <input
                type="date"
                id="createdAt"
                {...register("createdAt", {
                  valueAsDate: true,
                  required: {
                    value: true,
                    message: "required",
                  },
                })}
              />
            </div>
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
              <div className="invoice-input">
                <label htmlFor={`items.${index}.name`}>
                  <span>Item Name</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.name`}
                  {...register(`items.${index}.name`, {
                    required: {
                      value: true,
                      message: "enter item name",
                    },
                  })}
                />
                <span className="error">
                  {errors?.items?.[index]?.name?.message}
                </span>
              </div>
              <div className="invoice-input">
                <label htmlFor={`items.${index}.quantity`}>
                  <span>Qty.</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.quantity`}
                  {...register(`items.${index}.quantity`, {
                    required: { value: true, message: "specify quantity" },
                    pattern: {
                      value: /^\d{1,5}$/,
                      message: "Please enter a number",
                    },
                  })}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
                <span className="error">
                  {errors?.items?.[index]?.quantity?.message}
                </span>
              </div>
              <div className="invoice-input">
                <label htmlFor={`items.${index}.price`}>
                  <span>Price</span>
                </label>
                <input
                  type="text"
                  id={`items.${index}.price`}
                  {...register(`items.${index}.price`, {
                    required: {
                      value: true,
                      message: "specify price",
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
                <label htmlFor={`items.${index}.total`}>
                  <span>Total</span>
                </label>
                <input
                  type="number"
                  id={`items.${index}.totalAmount`}
                  value={watch(`items.${index}.total`, 0)}
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
              className="btn  btn-add"
              type="button"
              onClick={() => {
                insert(0, {
                  name: "",
                  qty: "",
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
