/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst playBtnIcon = playBtn.querySelector(\"i\");\nconst muteBtn = document.getElementById(\"mute\");\nconst muteBtnIcon = muteBtn.querySelector(\"i\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst volumeRange = document.getElementById(\"volume\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst fullScreenBtnIcon = fullScreenBtn.querySelector(\"i\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5; //global volume\n\nvideo.volume = volumeValue;\n\nconst handlePlayClick = e => {\n  if (video.paused) {\n    //비디오가 중지되어있으면 실행하기\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\n\nconst handleMute = e => {\n  if (video.muted) {\n    //muted 되어있으면 음소거 풀기\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nconst handleVolumeChange = e => {\n  if (video.muted) {\n    video.muted = false;\n    muteBtnIcon.classList = \"fas fa-volume-up\";\n  } //e.target.value\n\n\n  const {\n    target: {\n      value\n    }\n  } = e;\n\n  if (value == 0) {\n    video.muted = true;\n    muteBtnIcon.classList = \"fas fa-volume-mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nconst formatTime = second => new Date(second * 1000).toISOString().substring(14, 19); //비디오가 load된 후\n\n\nconst handleLoadedMetadata = () => {\n  totalTime.innerHTML = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n}; //비디오의 시간이 update 될 때마다\n\n\nconst handleTimeUpdate = () => {\n  currentTime.innerHTML = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nconst handleTimeChange = e => {\n  video.currentTime = e.target.value;\n};\n\nconst handleFullScreen = () => {\n  const fullScreen = document.fullscreenElement;\n\n  if (fullScreen) {\n    document.exitFullscreen();\n    fullScreenBtnIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtnIcon.classList = \"fas fa-compress\";\n  }\n};\n\nconst hideControls = () => videoControls.classList.remove(\"showing\");\n\nconst handleMouseMove = () => {\n  //화면에 3초 안에 들어오면\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  } //화면 안에서 계속 마우스 움직이고 있으면 계속 timeout 초기화하면서 다시 3초 세기\n\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\"); //화면 안에서 마우스 멈추면 3초뒤 아이콘 사라지게\n\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleMouseLeave = () => {\n  //3초 뒤 사라지게\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleEnded = () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  fetch(\"/api/videos/\".concat(id, \"/view\"), {\n    method: \"POST\"\n  });\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick); //재생\n\nmuteBtn.addEventListener(\"click\", handleMute); //소리 끄기\n\nvolumeRange.addEventListener(\"input\", handleVolumeChange); //볼륨 변경\n\nvideo.addEventListener(\"loadeddata\", handleLoadedMetadata); //비디오 load\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate); //비디오 시간 update\n\nvideo.addEventListener(\"ended\", handleEnded);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\ntimeline.addEventListener(\"input\", handleTimeChange); //시청시간 변경\n\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\n\n//# sourceURL=webpack://youtube_clone/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;