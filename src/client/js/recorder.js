import { formatDate } from "../../utils/date.js";

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
const handleDownload = () => {
  const date = formatDate();

  //링크 생성
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = `${date}_MyRecording.webm`;
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
    videoFile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    //녹화 파일 미리보기
    preview.src = videoFile;
    video.loop = true;
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
