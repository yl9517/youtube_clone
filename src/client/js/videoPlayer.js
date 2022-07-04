const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumenRange = document.getElementById("volumen");

console.log(video);
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
  muteBtn.innerText = video.muted ? "Mute" : "Unmute";
  volumenRange.value = video.muted ? 0 : 0.5;
};

playBtn.addEventListener("click", handlePlayClick); //재생
muteBtn.addEventListener("click", handleMute); //소리 끄기
