import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL); //DB연결

const db = mongoose.connection; //엑세스

const handleOpen = () => console.log("Connected to DB!!");
const handleError = () => console.log("DB Error", err);

db.on("error", handleError); //에러뜰 때마다 호출
db.once("open", handleOpen); //맨 처음 단 한번 호출
