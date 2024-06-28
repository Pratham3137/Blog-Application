import dotenv from "dotenv";

dotenv.config();

const config = Object.freeze({
  port: process.env.PORT,
});

export default config;
