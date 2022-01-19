import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

const handleLogin = (req, res) => {
  return res.send({ message: "Login here" });
};

app.use(logger);

app.get("/", (req, res) => {
  // 서버는 클라이언트가 요청한 해당 url을 가져다 줌
  return res.send("End");
});
app.get("/login", handleLogin);

//설정 후 개방
app.listen(PORT, console.log(`Server listening on port ${PORT}`)); // listen : 해당 port번호를 듣고있다가, request(요청)이 들어오면 작동
