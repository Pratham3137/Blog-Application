import {
  postCreate,
  getAllPost,
  getMyPost,
  postLike,
  getUserPost,
  postUpdate,
  postDelete,
} from "./controllers";
import postRouter from "./route";
import { createPostValidations, validate } from "./validations";
import { verifyToken } from "../../middleware/userValidation";

export {
  createPostValidations,
  validate,
  postCreate,
  getAllPost,
  getMyPost,
  postLike,
  getUserPost,
  postUpdate,
  postDelete,
  postRouter,
  verifyToken,
};
