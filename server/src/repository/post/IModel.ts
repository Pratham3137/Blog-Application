import { Schema } from "mongoose";

export interface PostDocument{
  userId: number;
  author: string;
  title:string,
  description: string;
  image: string;
  isLiked: any;
  likes: number;
  isDeleted: boolean;
}
