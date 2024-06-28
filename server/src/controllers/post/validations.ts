import { body, query, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const createPostValidations = () => [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .notEmpty()
    .custom((value) => {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < 1 || wordCount > 200) {
        throw new Error("Description must be between 1 and 200 words");
      }
      return true;
    }),
  body("image").notEmpty().isString().withMessage("Image must be a string"),
];

const getUserPostValidation = () => [
  body("userId").notEmpty().withMessage("User ID is required"),
  query("_limit")
    .isInt({ min: 1 })
    .withMessage("_limit must be a positive integer"),
  query("_page")
    .isInt({ min: 1 })
    .withMessage("_page must be a positive integer"),
];

const getMyPostValidation = () => [
  body("id").notEmpty().withMessage("userID is required"),
];

const postUpdateValidation = () => [
  body("id").notEmpty().withMessage("Post ID is required"),
  body("description")
    .notEmpty()
    .custom((value) => {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < 1 || wordCount > 200) {
        throw new Error("Description must be between 1 and 200 words");
      }
      return true;
    }),
  body("title").notEmpty().withMessage("Title is required"),
];

const postDeleteValidation = () => [
  param("id").notEmpty().withMessage("Post ID is required"),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  createPostValidations,
  getUserPostValidation,
  getMyPostValidation,
  postUpdateValidation,
  postDeleteValidation,
  validate,
};
