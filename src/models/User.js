import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("user pw:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("hash pw:", this.password);
});

const userModel = mongoose.model("User", userSchema);
//s자동으로 붙여져서 db명 : users
export default userModel;
