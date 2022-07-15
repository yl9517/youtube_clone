const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumenRange = document.getElementById("volumen");

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

const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerHTML = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlayClick); //재생
muteBtn.addEventListener("click", handleMute); //소리 끄기
volumenRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
