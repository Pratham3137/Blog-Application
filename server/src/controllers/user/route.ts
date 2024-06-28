import express from "express";
import cors from "cors";
import { userCreate, userGet } from "./controllers";
import { createUserValidations, validate } from "./validations";
import { checkEmail } from "../../middleware/userValidation";

const userRouter = express.Router();

userRouter.use(cors());

userRouter.post(
  "/signup",
  createUserValidations(),
  validate,
  checkEmail,
  userCreate
);

userRouter.post("/login", userGet);

export default userRouter;
