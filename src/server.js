import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//설정 후 개방
app.listen(PORT, console.log(`Server listening on port ${PORT}`)); // listen : 해당 port번호를 듣고있다가, request(요청)이 들어오면 작동
