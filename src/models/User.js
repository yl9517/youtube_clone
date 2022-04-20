import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatarUrl: String,
  //깃허브계정
  socialOnly: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  location: String,
});

//저장 되기 전 hash 돌리기
userSchema.pre("save", async function () {
  console.log("user pw:", this.password);
  this.password = await bcrypt.hash(this.password, 5); //5번 돌리기
  console.log("hash pw:", this.password);
});

const userModel = mongoose.model("User", userSchema);
//s자동으로 붙여져서 db명 : users
export default userModel;
