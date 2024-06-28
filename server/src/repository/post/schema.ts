import mongoose, { Schema } from "mongoose";
import { PostDocument } from "./IModel";

const postSchema = new Schema<PostDocument>(
  {
    userId: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isLiked: [
      {
        type: Number,
        default: [],
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<PostDocument>("Post", postSchema);

export default Post;
