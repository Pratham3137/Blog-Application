import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog_application");
  } catch (error) {
    console.log(error);
  }
};
