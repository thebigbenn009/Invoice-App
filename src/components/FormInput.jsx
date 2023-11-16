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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
