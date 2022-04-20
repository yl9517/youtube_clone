import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController.js";
import {
  avatarUpload,
  protectorMiddelware,
  publicOnlyMiddleware,
} from "../middlewares.js";

const userRouter = express.Router();
userRouter.get("/logout", protectorMiddelware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddelware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddelware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
