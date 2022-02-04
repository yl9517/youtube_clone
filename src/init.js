import "./db.js";
import "./models/Video.js";
import app from "./server.js";

const PORT = 4000;

//server에서 설정 후 개방
app.listen(PORT, console.log(`Server listening on port ${PORT}`)); // listen : 해당 port번호를 듣고있다가, request(요청)이 들어오면 작동
