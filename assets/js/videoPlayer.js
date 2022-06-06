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

eval("__webpack_require__.r(__webpack_exports__);\nvar video = document.getElementById(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar time = document.getElementById(\"time\");\nvar volumen = document.getElementById(\"volumen\");\n\nvar handlePlayClick = function handlePlayClick(e) {\n  if (video.paused) {\n    //비디오가 중지되어있으면 실행하기\n    video.play();\n  } else {\n    video.paused();\n  }\n};\n\nvar handlePause = function handlePause() {\n  return playBtn.innerText = \"Play\";\n};\n\nvar handlePlay = function handlePlay() {\n  return playBtn.innerText = \"Pause\";\n};\n\nvar handleMute = function handleMute(e) {};\n\nplayBtn.addEventListener(\"click\", handlePlayClick); //재생\n\nmuteBtn.addEventListener(\"click\", handleMute); //소리 끄기\n\nvideo.addEventListener(\"pause\", handlePause); //pause 상태면 play 텍스트 출력\n\nvideo.addEventListener(\"play\", handlePlay); //Play 상태면 pause 텍스트 출력\n\n//# sourceURL=webpack://youtube_clone/./src/client/js/videoPlayer.js?");

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