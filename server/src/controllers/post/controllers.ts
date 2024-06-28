import { NextFunction, Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  likePost,
  getAuthor,
  getPostByUserId,
  updatePost,
  getPost,
} from "../../repository/post/repository";

const postCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, title, description, image } = req.body;

  try {
    const author = await getAuthor(userId);
    if (author) {
      const result = await createPost(
        userId,
        author,
        title,
        description,
        image
      );
      res.json({ message: `Post Created Successfully.........`, data: result });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error.....", error: error.message });
  }
  next();
};

const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  const { _limit, _page } = req.query as any;
  const skip: number = (parseInt(_page) - 1) * parseInt(_limit);
  try {
    const posts = await getAllPosts(skip, parseInt(_limit));
    res.json(posts);
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

const getUserPost = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  console.log("🚀 ~ getUserPost ~ userId:", userId)
  const { _limit, _page } = req.query as any;
  console.log("🚀 ~ getUserPost ~ _page:", _page)
  console.log("🚀 ~ getUserPost ~ _limit:", _limit)
  const skip: number = (parseInt(_page) - 1) * parseInt(_limit);
  try {
    const posts = await getPostByUserId(userId, skip, parseInt(_limit));
    res.json(posts);
    console.log("🚀 ~ getUserPost ~ posts:", posts)
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

const getMyPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    const posts = await getPost(id);
    res.json(posts);
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

const postUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const { id, description, title } = req.body;
  try {
    const posts = await updatePost(id, description, title);
    res.json(posts);
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

const postLike = async (req: Request, res: Response, next: NextFunction) => {
  const { id, isLiked } = req.body;
  try {
    const posts = await likePost(id, isLiked);
    res.json(posts);
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

const postDelete = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const post = await deletePost(id);
    if (!post) {
      res.status(404).json({ message: "Post not deleted....." });
    }
    res.send({ message: "Post deleted Successfully....." });
  } catch (error: any) {
    res.status(404).json({ message: "Error.....", error: error.message });
  }
  next();
};

export {
  postCreate,
  getAllPost,
  getMyPost,
  postLike,
  getUserPost,
  postUpdate,
  postDelete,
};
