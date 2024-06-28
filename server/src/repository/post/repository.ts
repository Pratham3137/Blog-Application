import Post from "./schema";
import User from "../user/schema";

async function createPost(
  userId: number,
  author: string,
  title: string,
  description: string,
  image: string
) {
  const post = new Post({ userId, author, title, description, image });
  return await post.save();
}

async function getAuthor(userId: number) {
  const userName = await User.findOne({ userId }, { name: 1 });
  if (userName) {
    return userName.name;
  }
  return null;
}

async function getAllPosts(skip:number,_limit:number) {
  return await Post.find({ isDeleted: false }).sort({updatedAt:-1}).skip(skip).limit(_limit);
}

async function getPost(id: string) {
  return await Post.findById(id);
}

async function getPostByUserId(userId: number,skip:number,_limit:number) {
  const userPosts =  await Post.find({ userId, isDeleted: false }).skip(skip).limit(_limit);
  console.log("🚀 ~ getPostByUserId ~ userPosts:", userPosts)
  return userPosts;
}

async function updatePost(id: string, description: string, title: string) {
  return await Post.findByIdAndUpdate(id, { title, description }, { new: true });
}

async function likePost(id: string, isLiked: []) {
  return await Post.findByIdAndUpdate(
    id,
    { isLiked, likes: isLiked.length },
    { new: true }
  );
}

async function deletePost(id: string) {
  const post = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return post;
}

export {
  createPost,
  getAllPosts,
  getPost,
  getAuthor,
  likePost,
  getPostByUserId,
  updatePost,
  deletePost,
};
