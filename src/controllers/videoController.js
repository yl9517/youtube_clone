import videoModel from "../models/Video.js";

export const home = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1]; //id로 비디오 찾기 (배열은 0부터)
  return res.render("watch", { pageTitle: `Watching:` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1]; //id로 비디오 찾기 (배열은 0부터)
  return res.render("edit", { pageTitle: `Editing:` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //form 데이터 받기
  videos[id - 1].title = title; //해당 비디오 가져와서 정보 변경
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
      hashtags: hashtags.split(",").map((word) => `#${word}`), // ,기준으로 분리 후 # 붙여주기
      meta: {
        views: 0,
        rating: 0,
      },
    });
  } catch (err) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errMsg: err._message,
    });
  }

  return res.redirect("/");
};

export const deleteVideo = (req, res) => res.send("delete Video");
