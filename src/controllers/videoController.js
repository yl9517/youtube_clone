import userModel from "../models/User.js";
import videoModel from "../models/Video.js";

export const home = async (req, res) => {
  const videos = await videoModel
    .find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner");

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
  if (String(video.owner) !== String(req.session.user._id))
    return res.status(403).redirect("/");

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
  if (String(video.owner) !== String(req.session.user._id))
    return res.status(403).redirect("/");

  //업데이트하기
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  const { _id } = req.session.user;

  try {
    const newVideo = await videoModel.create({
      title,
      fileUrl,
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

  await videoModel.findByIdAndDelete(id);

  //영상 주인아니면 튕겨내기
  if (String(video.owner) !== String(req.session.user._id))
    return res.status(403).redirect("/");

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
