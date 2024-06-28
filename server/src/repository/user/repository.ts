import bcrypt from "bcrypt";
import User from "./schema";
import { UserDocument } from "./IModel";

const totaluser = async () => {
  const totalCount = await User.countDocuments();
  return totalCount;
};
const hashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createUser = async (
  userId: number,
  name: string,
  email: string,
  password: string
) => {
  const Password = await hashedPassword(password);
  const user = new User({ userId, name, email, password: Password });
  return await user.save();
};

const getUser = async (email: string, password: string) => {
  const user: UserDocument | null = await User.findOne({ email: email });
  if (!user) {
    return "Invalid Email Address";
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return "Invalid Password";
  }
  return user;
};

const checkUser = async (email: string) => {
  const user = await User.findOne({ email: email });
  return !!user;
};

export { totaluser, createUser, getUser, checkUser };
