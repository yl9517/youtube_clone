import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  remove,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController.js";
import { protectorMiddelware, publicOnlyMiddleware } from "../middlewares.js";

const userRouter = express.Router();
userRouter.get("/logout", protectorMiddelware, logout);
userRouter.route("/edit").all(protectorMiddelware).get(getEdit).post(postEdit);
userRouter.get("/delete", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
