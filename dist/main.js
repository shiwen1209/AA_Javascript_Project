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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.querySelector('canvas')\n    const ctx = canvas.getContext('2d')\n\n    ctx.fillStyle = \"darkblue\"\n    ctx.fillRect(0, 0, 800, 800);\n\n    ctx.fillStyle = \"green\"\n    ctx.fillRect(200, 200, 400, 8);\n\n    // ctx.fillStyle = \"yellow\"\n    // ctx.fillRect(200, 200, 10, 900);\n\n\n\n\n    ctx.strokeStyle = 'green';\n    ctx.beginPath(0, 0);\n    ctx.moveTo(202, 202);\n    ctx.lineTo(0, 500);\n    ctx.lineWidth = 6;\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.moveTo(600, 200)\n    ctx.bezierCurveTo(0, 30, 31, 7, 70, 8);\n    ctx.bezierCurveTo(109, 9, 313, 99, 425, -100);\n    ctx.bezierCurveTo(516, 82.5, 536, 55, 536, 55);\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.lineWidth = \"8\";\n    ctx.strokeStyle = \"yellow\";\n    ctx.rect(250, 250, 150, 80);\n    ctx.stroke();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;