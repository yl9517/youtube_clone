const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumenRange = document.getElementById("volumen");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5; //global volume
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    //비디오가 중지되어있으면 실행하기
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    //muted 되어있으면 음소거 풀기
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumenRange.value = video.muted ? 0 : volumeValue;
  video.volume = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  //e.target.value
  const {
    target: { value },
  } = e;

  if (value == 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(11, 19);

//비디오가 load된 후
const handleLoadedMetadata = () => {
  currentTime.innerHTML = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

//비디오의 시간이 update 될 때마다
const handleTimeUpdate = () => {
  currentTime.innerHTML = formatTime(Math.floor(video.currentTime));
};

const handleTimeChange = (e) => {
  video.currentTime = e.target.value;
};

playBtn.addEventListener("click", handlePlayClick); //재생
muteBtn.addEventListener("click", handleMute); //소리 끄기
volumenRange.addEventListener("input", handleVolumeChange); //볼륨 변경
video.addEventListener("loadedmetadata", handleLoadedMetadata); //비디오 load
video.addEventListener("timeupdate", handleTimeUpdate); //비디오 시간 update
timeline.addEventListener("input", handleTimeChange); //시청시간 변경
