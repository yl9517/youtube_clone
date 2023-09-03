const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5; //global volume
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    //비디오가 중지되어있으면 실행하기
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    //muted 되어있으면 음소거 풀기
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }

  //e.target.value
  const {
    target: { value },
  } = e;

  if (value == 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(14, 19);

//비디오가 load된 후
const handleLoadedMetadata = () => {
  totalTime.innerHTML = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

//비디오의 시간이 update 될 때마다
const handleTimeUpdate = () => {
  currentTime.innerHTML = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeChange = (e) => {
  video.currentTime = e.target.value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  //화면에 3초 안에 들어오면
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  //화면 안에서 계속 마우스 움직이고 있으면 계속 timeout 초기화하면서 다시 3초 세기
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  //화면 안에서 마우스 멈추면 3초뒤 아이콘 사라지게
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  //3초 뒤 사라지게
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick); //재생
muteBtn.addEventListener("click", handleMute); //소리 끄기
volumeRange.addEventListener("input", handleVolumeChange); //볼륨 변경
video.addEventListener("loadeddata", handleLoadedMetadata); //비디오 load
video.addEventListener("timeupdate", handleTimeUpdate); //비디오 시간 update
video.addEventListener("ended", handleEnded);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimeChange); //시청시간 변경
fullScreenBtn.addEventListener("click", handleFullScreen);
