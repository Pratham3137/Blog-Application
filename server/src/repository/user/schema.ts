import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./IModel";

const userSchema = new Schema<UserDocument>(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: [25, "Name cannot be more than 25 characters"],
      validate: {
        validator: (a: string) => {
          return /^[a-zA-Z0-9 ]*$/.test(a);
        },
        message: (props: { value: string }) =>
          `${props.value} contains special characters, which are not allowed`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (a: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
