import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  console.log('login',  res.locals.loggedInUser )
  next();
};

export const protectorMiddelware = (req, res, next) => {
  //로그인 되어있으면 계속 진행
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  //비로그인이면 계속 진행 (로그인한 사람이 로그인창에 들어갈 수 없게)
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

//파일 업로드
export const avatarUpload = multer({ dest: "uploads/avatars/", limits:{ fileSize: 3000000 } });
export const videoUpload = multer({ dest: "uploads/videos/", limits:{ fileSize: 10000000 } });
