import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const YouTubeForm = () => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onSubmit = (data) => {
    console.log("Form Submitted");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="email">email</label>
        <input
          type="text"
          {...register("email", {
            required: "email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
          id="email"
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="channel">channel</label>
        <input
          type="text"
          {...register("channel", {
            required: "Channel is required",
          })}
          id="channel"
        />
        <p>{errors.channel?.message}</p>
        <label htmlFor="Twitter">Twitter</label>
        <input
          type="text"
          {...register("social.twitter", {
            required: {
              value: true,
              message: "twitter required",
            },
          })}
          id="Twitter"
        />
        <p>{errors?.social?.twitter?.message}</p>
        <br />
        <label htmlFor="facebook">facebook</label>
        <input type="text" {...register("social.facebook")} id="facebook" />
        <br />
        <label htmlFor="primary-phone">primary-phone</label>
        <input type="text" {...register("phoneNumbers.0")} id="primary-phone" />
        <br />
        <label htmlFor="secondary-phone">secondary-phone</label>
        <input
          type="text"
          {...register("phoneNumbers.1")}
          id="secondary-phone"
        />
        <div>
          <label htmlFor="">list of phone numbers</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => append({ number: "" })}>
            Add Number
          </button>
        </div>
        <br /> <br />
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
