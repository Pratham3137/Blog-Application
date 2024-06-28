import { NextFunction, Request, Response } from "express";
import {
  createUser,
  totaluser,
  getUser,
} from "../../repository/user/repository";
import { createToken } from "../../middleware/userValidation";

const userCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const userId = await totaluser().then((count) => {
    return count + 101;
  });
  try {
    await createUser(userId, name, email, password);

    res
      .status(201)
      .json({ message: `User created successfully with UserId: ${userId}` });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
  next();
};

const userGet = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email, password);

    if (typeof user !== "string") {
      const token: string = createToken(user?.name);
      res.status(200).json({
        message: "User Verified successfully",
        token,
        userId: `${user.userId}`,
        userName: `${user.name}`,
      });
    } else {
      res.status(404).json({ message: user });
    }
  } catch (error: any) {
    res.status(404).json({ message: "User Not Found", error: error.message });
  }
  next();
};

export { userCreate, userGet };
