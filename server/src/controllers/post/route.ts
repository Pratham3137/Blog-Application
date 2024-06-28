import express from "express";
import {
  postCreate,
  getAllPost,
  getUserPost,
  postUpdate,
  getMyPost,
  postDelete,
  postLike,
  verifyToken,
  createPostValidations,
  validate,
} from "./index";
import {
  getMyPostValidation,
  getUserPostValidation,
  postDeleteValidation,
  postUpdateValidation,
} from "./validations";

const postRouter = express.Router();

postRouter.post(
  "/writePost",
  verifyToken,
  createPostValidations(),
  validate,
  postCreate
);

postRouter.get("/dashboard", verifyToken, getAllPost);

postRouter.patch("/like", verifyToken, postLike);

postRouter.post(
  "/myposts",
  verifyToken,
  getUserPostValidation(),
  validate,
  getUserPost
);

postRouter.post(
  "/mypost",
  verifyToken,
  getMyPostValidation(),
  validate,
  getMyPost
);

postRouter.patch(
  "/editPost",
  verifyToken,
  postUpdateValidation(),
  validate,
  postUpdate
);

postRouter.delete(
  "/myposts/:id",
  verifyToken,
  postDeleteValidation(),
  validate,
  postDelete
);

export default postRouter;
