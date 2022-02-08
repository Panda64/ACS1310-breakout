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

/***/ "./src/Ball.js":
/*!*********************!*\
  !*** ./src/Ball.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// ----------------------------------------------------------------------------\n\n// Ball\n\n// ----------------------------------------------------------------------------\n\n\n\nclass Ball extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {\n    super(x, y, radius * 2, radius * 2, color);\n    this.dx = dx;\n    this.dy = dy;\n    this.radius = radius;\n    this.PI2 = Math.PI * 2;\n  }\n\n  move() {\n    this.moveBy(this.dx, this.dy);\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\n\n\n//# sourceURL=webpack:///./src/Ball.js?");

/***/ }),

/***/ "./src/Brick.js":
/*!**********************!*\
  !*** ./src/Brick.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// ----------------------------------------------------------------------------\n\n// Brick\n\n// ----------------------------------------------------------------------------\n\n\n\nclass Brick extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, color) {\n    super(x, y, width, height, color);\n\n    this.status = 1;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Brick);\n\n\n//# sourceURL=webpack:///./src/Brick.js?");

/***/ }),

/***/ "./src/Bricks.js":
/*!***********************!*\
  !*** ./src/Bricks.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Brick */ \"./src/Brick.js\");\n\n\nclass Bricks {\n  constructor({\n    cols, rows, width, height, padding, offsetLeft, offsetTop, color,\n  }) {\n    this.cols = cols;\n    this.rows = rows;\n    this.bricks = [];\n    this.bricks = width;\n    this.height = height;\n    this.padding = padding;\n    this.offsetLeft = offsetLeft;\n    this.offsetTop = offsetTop;\n    this.color = color;\n\n    this.init();\n  }\n\n  init() {\n    for (let c = 0; c < this.cols; c += 1) {\n      this.bricks[c] = [];\n      for (let r = 0; r < this.rows; r += 1) {\n        const brickX = (r * (this.width + this.padding)) + this.offsetLeft;\n        const brickY = (c * (this.height + this.padding)) + this.offsetTop;\n        this.bricks[c][r] = new _Brick__WEBPACK_IMPORTED_MODULE_0__[\"default\"](brickX, brickY, this.width, this.height, this.color);\n      }\n    }\n  }\n\n  render(ctx) {\n    for (let c = 0; c < this.cols; c += 1) {\n      for (let r = 0; r < this.rows; r += 1) {\n        const brick = this.bricks[c][r];\n        if (brick.status === 1) {\n          brick.render(ctx);\n        }\n      }\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bricks);\n\n\n//# sourceURL=webpack:///./src/Bricks.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.js\");\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n/* harmony import */ var _Bricks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bricks */ \"./src/Bricks.js\");\n/* harmony import */ var _GameLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameLabel */ \"./src/GameLabel.js\");\n// -------------------------------------------------------------------------------------------------\n\n// Game\n\n// -------------------------------------------------------------------------------------------------\n\n\n\n\n\n\nclass Game {\n  constructor(canvasId) {\n    this.canvas = document.getElementById(canvasId);\n    this.ctx = this.canvas.getContext('2d');\n\n    this.ballRadius = 10;\n    this.paddleHeight = 10;\n    this.paddleWidth = 75;\n    this.brickRowCount = 5;\n    this.brickColumnCount = 3;\n    this.brickWidth = 75;\n    this.brickHeight = 20;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;\n    this.paddleYStart = this.canvas.height - this.paddleHeight;\n    this.objectColor = '#0095DD';\n\n    this.gameWonMessage = 'You Won!';\n    this.gameOverMessage = 'Game Over.';\n\n    this.scoreLabel = new _GameLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('Score', 8, 20, this.objectColor);\n    this.livesLabel = new _GameLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('Lives', this.canvas.width - 65, 20, this.objectColor);\n    this.paddle = new _Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, this.objectColor);\n\n    this.bricks = new _Bricks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      cols: this.brickColumnCount,\n      rows: this.brickRowCount,\n      width: this.brickWidth,\n      height: this.brickHeight,\n      padding: this.brickPadding,\n      offsetLeft: this.brickOffsetLeft,\n      offsetTop: this.brickOffsetTop,\n      color: this.objectColor,\n    });\n\n    this.ball = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 2, -2, this.ballRadius, this.objectColor);\n\n    this.rightPressed = false;\n    this.leftPressed = false;\n\n    this.setup();\n\n    this.draw();\n  }\n\n  setup() {\n    this.livesLabel.value = 3;\n    this.resetBallAndPaddle();\n\n    document.addEventListener('keydown', (e) => {\n      this.keyDownHandler(e);\n    }, false);\n    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);\n    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);\n  }\n\n  resetBallAndPaddle() {\n    this.ball.x = this.canvas.width / 2;\n    this.ball.y = this.canvas.height - 30;\n    this.ball.dx = 3;\n    this.ball.dy = -3;\n    this.paddle.x = this.paddleXStart;\n  }\n\n  collisionDetection() {\n    for (let c = 0; c < this.bricks.cols; c += 1) {\n      for (let r = 0; r < this.bricks.rows; r += 1) {\n        const brick = this.bricks.bricks[c][r];\n        if (brick.status === 1) {\n          if (this.ball.x > brick.x\n                && this.ball.x < brick.x + this.brickWidth\n                && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {\n            this.ball.dy = -this.ball.dy;\n            brick.status = 0;\n            this.scoreLabel.value += 1;\n            if (this.scoreLabel.value === this.bricks.cols * this.bricks.rows) {\n              alert(this.gameWonMessage);\n              document.location.reload();\n            }\n          }\n        }\n      }\n    }\n  }\n\n  movePaddle() {\n    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {\n      this.paddle.moveBy(7, 0);\n    } else if (this.leftPressed && this.paddle.x > 0) {\n      this.paddle.moveBy(-7, 0);\n    }\n  }\n\n  collisionsWithCanvasAndPaddle() {\n    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius\n        || this.ball.x + this.ball.dx < this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n    }\n    if (this.ball.y + this.ball.dy < this.ballRadius) {\n      this.ball.dy = -this.ball.dy;\n    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ballRadius) {\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddleWidth) {\n        this.ball.dy = -this.ball.dy;\n      } else {\n        this.livesLabel.value -= 1;\n        if (this.livesLabel.value < 1) {\n          alert(this.gameOverMessage);\n          document.location.reload();\n        } else {\n          this.resetBallAndPaddle();\n        }\n      }\n    }\n  }\n\n  keyDownHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = true;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = true;\n    }\n  }\n\n  keyUpHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = false;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = false;\n    }\n  }\n\n  mouseMoveHandler(e) {\n    const relativeX = e.clientX - this.canvas.offsetLeft;\n    if (relativeX > 0 && relativeX < this.canvas.width) {\n      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);\n    }\n  }\n\n  draw() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.bricks.render(this.ctx);\n    this.ball.render(this.ctx);\n    this.paddle.render(this.ctx);\n    this.scoreLabel.render(this.ctx);\n    this.livesLabel.render(this.ctx);\n    this.collisionDetection();\n    this.ball.move();\n    this.movePaddle();\n    this.collisionsWithCanvasAndPaddle();\n    this.movePaddle();\n\n    requestAnimationFrame(() => {\n      this.draw();\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/GameLabel.js":
/*!**************************!*\
  !*** ./src/GameLabel.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// ------------------------------------------------------------------\n\n// GameLabel\n\n// ------------------------------------------------------------------\n\n\n\nclass GameLabel extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(text, x, y, color, font = '16px Arial') {\n    super(x, y, 0, 0, color);\n    this.text = text;\n    this.value = 0;\n    this.font = font;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameLabel);\n\n\n//# sourceURL=webpack:///./src/GameLabel.js?");

/***/ }),

/***/ "./src/Sprite.js":
/*!***********************!*\
  !*** ./src/Sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// ----------------------------------------------------------------------------\n\n// Sprite\n\n// ----------------------------------------------------------------------------\n\nclass Sprite {\n  constructor(x = 0, y = 0, width = 10, height = 10, color = 'red') {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.color = color;\n  }\n\n  moveBy(dx, dy) {\n    this.x += dx;\n    this.y += dy;\n  }\n\n  moveTo(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n\n//# sourceURL=webpack:///./src/Sprite.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n// --------------------------------------------------\n// Game\n// --------------------------------------------------\n\n\n\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('myCanvas');\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;