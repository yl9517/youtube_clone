import express from "express";
import { join, login } from "../controllers/userController.js";
import { home } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", home); //컨트롤러 import 해야함
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
