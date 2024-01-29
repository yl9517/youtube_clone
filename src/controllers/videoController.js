import userModel from "../models/User.js";
import videoModel from "../models/Video.js";
import commentModel from "../models/Comment.js";

export const home = async (req, res) => {
  const videos = await videoModel
    .find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel
    .findById(id)
    .populate("owner")
    .populate("comments");

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);

  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found" });

  //영상 주인아니면 튕겨내기
  if (String(video.owner) !== String(req.session.user._id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body; //form 데이터 받기

  const video = await videoModel.exists({ _id: id }); //굳이 video객체가 필요하지 않으므로 exists로 video 찾기
  //없으면 에러페이지
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found" });

  //영상 주인아니면 튕겨내기
  if (String(video.owner) !== String(req.session.user._id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }

  //업데이트하기
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });

  req.flash("success", "Changes saved");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { _id } = req.session.user;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;

  const isHeroku = process.env.NOTE_ENV === "production";
  try {
    const newVideo = await videoModel.create({
      title,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku ? thumb[0].location : video[0].path,
      description,
      createdAt: Date.now(),
      owner: _id,
      hashtags: videoModel.formatHashtags(hashtags),
    });

    const user = await userModel.findById(_id);

    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errMsg: err._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);

  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found" });

  //영상 주인아니면 튕겨내기
  if (String(video.owner) !== String(req.session.user._id))
    return res.status(403).redirect("/");

  await videoModel.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await videoModel
      .find({
        title: {
          $regex: new RegExp(keyword, "i"), //contain 방식의 regular expression 생성
        },
      })
      .populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await videoModel.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await commentModel.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();

  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const id = req.params.id;

  const comment = await commentModel.findById(id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }
  //댓글 주인아니면 튕겨내기
  if (String(comment.owner) !== String(req.session.user._id))
    return res.status(403).redirect("/");

  await commentModel.findByIdAndDelete(id);

  return res.sendStatus(200);
};
