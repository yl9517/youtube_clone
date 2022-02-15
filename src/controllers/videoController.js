import videoModel from "../models/Video.js";

export const home = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  videoModel.findOne;
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body; //form 데이터 받기

  const video = await videoModel.exists({ _id: id }); //굳이 video객체가 필요하지 않으므로 exists로 video 찾기
  if (!video) {
    //없으면 에러페이지
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

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
  const { title, description, hashtags } = req.body;
  try {
    await videoModel.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: videoModel.formatHashtags(hashtags),
    });
  } catch (err) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errMsg: err._message,
    });
  }

  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    await videoModel.findByIdAndDelete(id);
  } catch (err) {}
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await videoModel.find({
      title: {
        $regex: new RegExp(keyword, "i"), //contain 방식의 regular expression 생성
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
