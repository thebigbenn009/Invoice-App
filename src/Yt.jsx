import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const YouTubeForm = () => {
  const { register, control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "username is required",
          })}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: "^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$",
              message: "Invalid email format",
            },
          })}
          id="email"
        />
        <label htmlFor="channel">channel</label>
        <input
          type="text"
          {...register("channel", {
            required: "Channel is required",
          })}
          id="channel"
        />

        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
