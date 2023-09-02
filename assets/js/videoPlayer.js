/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst volumenRange = document.getElementById(\"volumen\");\nconst timeline = document.getElementById(\"timeline\");\nlet volumeValue = 0.5; //global volume\n\nvideo.volume = volumeValue;\n\nconst handlePlayClick = e => {\n  if (video.paused) {\n    //비디오가 중지되어있으면 실행하기\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nconst handleMute = e => {\n  if (video.muted) {\n    //muted 되어있으면 음소거 풀기\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"Unmute\" : \"Mute\";\n  volumenRange.value = video.muted ? 0 : volumeValue;\n  video.volume = video.muted ? 0 : volumeValue;\n};\n\nconst handleVolumeChange = e => {\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  } //e.target.value\n\n\n  const {\n    target: {\n      value\n    }\n  } = e;\n\n  if (value == 0) {\n    video.muted = true;\n    muteBtn.innerText = \"Unmute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nconst formatTime = second => new Date(second * 1000).toISOString().substring(11, 19); //비디오가 load된 후\n\n\nconst handleLoadedMetadata = () => {\n  currentTime.innerHTML = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n}; //비디오의 시간이 update 될 때마다\n\n\nconst handleTimeUpdate = () => {\n  currentTime.innerHTML = formatTime(Math.floor(video.currentTime));\n};\n\nconst handleTimeChange = e => {\n  video.currentTime = e.target.value;\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick); //재생\n\nmuteBtn.addEventListener(\"click\", handleMute); //소리 끄기\n\nvolumenRange.addEventListener(\"input\", handleVolumeChange); //볼륨 변경\n\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata); //비디오 load\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate); //비디오 시간 update\n\ntimeline.addEventListener(\"input\", handleTimeChange); //시청시간 변경\n\n//# sourceURL=webpack://youtube_clone/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;