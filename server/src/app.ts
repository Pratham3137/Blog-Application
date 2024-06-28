import express from "express";
import cors from "cors";
import config from "./config/config";
import userRouter from "./controllers/user/route";
import postRouter from "./controllers/post/route";
import { connection } from "./db/connection";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/v1", userRouter);
app.use("/v1", postRouter);

connection().then(() => {
  console.log("MongoDB connected");
  const port = config.port;
  app.listen(port, () => {
    console.log(`Connected to server on port ${port}`);
  });
});
