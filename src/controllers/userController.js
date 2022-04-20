import userModel from "../models/User.js";
import fetch from "node-fetch";
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

  const user = await userModel.findOne({ username, socialOnly: false });
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
  //로그인 시켜주기 => middleware에서 받을 수 있음
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

//github login
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString(); //config 합쳐서 url 만들기
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json", //json 형식임을 알려주기
      },
    })
  ).json();

  //user 정보받기
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    //user의 email 받기
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await userModel.findOne({ email: emailObj.email });

    //해당 email을 가진 user가 없다면 (=> 가입)
    if (!user) {
      const user = await userModel.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        socialOnly: true,
        password: "",
        location: userData.location,
      });
    }
    //가입했으면 로그인 or user가 이미 있으면 로그인
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pateTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl }, //로그인한 유저의 정보
    },
    body: { name, email, username, location },
    file,
  } = req;

  // 단, 이미 있는 username이나 email이면 업데이트 불가하게 해줘야함
  // exists 이용하기
  //(1. 현재유저가 업데이트 하려는 중인지 먼저 알아야함 : form의 바꾸려는 정보가 session.user에 있는 정보와 다른지 확인. => 다르면 변경하고싶다는 것)
  const findUsername = await userModel.findOne({ username }); //유저네임 같은사람
  const findEmail = await userModel.findOne({ email }); //이메일 같은사람

  if (findUsername._id != _id || findEmail._id != _id) {
    //바꾸려는 정보의 아이디가 현재 정보와 같지 않으면 이미 있는정보이므로 업뎃불가
    return res.render("edit-profile", {
      pateTitle: "Edit Profile",
      errorMsg: "User is exist",
    });
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  // 세션도 업데이트 시켜줘야함 (session은 DB와 연결되어있지 않으므로)
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    //이걸 많이 사용하게 되면 middleware로 뺼거임
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password }, //req.session.user._id
    },
    body: { oldPW, newPW, newPWConfirmation }, //req.body. ...
  } = req;

  const ok = await bcrypt.compare(oldPW, password); //hash할 비번 앞으로 - 순서 중요

  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMsg: "The current password is incorrect",
    });
  }

  if (newPW !== newPWConfirmation) {
    // 새 비번 둘이 다르면
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMsg: "The new password does not match the confirmation",
    });
  }

  const user = await userModel.findById(_id);
  user.password = newPW;
  await user.save();
  req.session.user.password = user.password;

  return res.redirect("/users/logout");
};

export const remove = (req, res) => res.send("Remove User");
