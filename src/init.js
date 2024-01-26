import "dotenv/config";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment.js";
import "./utils/date.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;

//server에서 설정 후 개방
app.listen(PORT, console.log(`Server listening on http://localhost:${PORT}`)); // listen : 해당 port번호를 듣고있다가, request(요청)이 들어오면 작동
