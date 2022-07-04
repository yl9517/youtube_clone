const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumen = document.getElementById("volumen");

console.log(video);
const handlePlayClick = (e) => {
  if (video.paused) {
    //비디오가 중지되어있으면 실행하기
    video.play();
  } else {
    video.pause();
  }
};

const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {
  if (video.muted) {
    //muted 되어있으면 음소거 풀기
    video.muted = false;
    muteBtn.innerText = "Mute";
  } else {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  }
};

playBtn.addEventListener("click", handlePlayClick); //재생
muteBtn.addEventListener("click", handleMute); //소리 끄기
video.addEventListener("pause", handlePause); //pause 상태면 play 텍스트 출력
video.addEventListener("play", handlePlay); //Play 상태면 pause 텍스트 출력
