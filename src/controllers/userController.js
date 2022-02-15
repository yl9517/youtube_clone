import userModel from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    //비밀번호가 같지 않다면
    return res.status(400).render("join", {
      pageTitle,
      errorMsg: "Password confirmation does not match.",
    });
  }

  const exists = await userModel.exists({
    $or: [{ username }, { email }],
    //user 혹은 email 중 하나가 이미 존재한다면
  });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMsg: "This username/email is already taken.",
    });
  }
  try {
    await userModel.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (err) {
    return res.status(404).render("join", {
      pageTitle,
      errorMsg: error._message,
    });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "An account with this username/password does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "Wrong password",
    });
  }
  req.session.loggedIn = true; //로그인 t
  req.session.user = user; //유저 저장

  return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
