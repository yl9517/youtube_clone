import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube"); //DB연결

const db = mongoose.connection; //엑세스

const handleOpen = () => console.log("Connected to DB!!");
const handleError = () => console.log("DB Error", err);

db.on("error", handleError); //에러뜰 때마다 호출
db.once("open", handleOpen); //맨 처음 단 한번 호출
