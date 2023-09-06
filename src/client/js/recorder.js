import { formatDate } from "../../utils/date.js";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob); //마법의 url 생성

  //링크 생성
  const date = formatDate();
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = `${date}_MyRecording.mp4`;
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.start();
  recorder.ondataavailable = (event) => {
    //녹화 파일 비디오 볼 수 있는 url생성
    videoFile = URL.createObjectURL(event.data); //event.data = blob
    preview.srcObject = null;
    //녹화 파일 미리보기
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  //현재화면 미리보기
  preview.srcObject = stream;
  preview.play();
};

init();
startBtn.addEventListener("click", handleStart);
