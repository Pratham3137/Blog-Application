import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkUser } from "../repository/user/repository";

const createToken = (name: string | undefined): string => {
  const token = jwt.sign({ name }, "Pratham_Mahadik", {
    expiresIn: "15m",
  });
  return token;
};

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ error: "Token not provided" });
    return;
  }
  jwt.verify(token, "Pratham_Mahadik", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Session expired" });
    }
    next();
  });
};

const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email } = req.body;

  try {
    const isPresent = await checkUser(email);
    if (isPresent) {
      return res.status(409).json({ error: "Email already exists" });
    }
  } catch (error) {
    console.log("🚀 ~ checkEmail ~ error:", error);
  }
  next();
};

export { createToken, verifyToken, checkEmail };
