import { formatDate } from "../../utils/date.js";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const date = formatDate();

  //링크 생성+다운로드
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = `${date}_${fileName}`;
  document.body.appendChild(a);
  a.click();
};
const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  //파일 변환 webm -> mp4
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  ); //-ss = 특정 시간대

  const mp4File = ffmpeg.FS("readFile", files.output); //파일 읽기
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" }); //해당 type의 blob 생성
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob); //마법의 url 생성
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, `MyRecording.mp4`); //영상
  downloadFile(thumbUrl, `MyThumbnail.jpg`); //썸네일

  //속도측면에서 파일 해제, 소스파일해제
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);
  //+url 제거
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  init();
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    //녹화 파일 비디오 볼 수 있는 url생성
    videoFile = URL.createObjectURL(event.data); //event.data = blob
    preview.srcObject = null;
    //녹화 파일 미리보기
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 3000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  //현재화면 미리보기
  preview.srcObject = stream;
  preview.play();
};

init();
actionBtn.addEventListener("click", handleStart);
