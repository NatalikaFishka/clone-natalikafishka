/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_class_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/class-canvas */ \"./src/utils/class-canvas.js\");\n/* harmony import */ var _utils_image_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/image-api */ \"./src/utils/image-api.js\");\n\r\n\r\n\r\nconst data = [\r\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\r\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\r\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\r\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\r\n];\r\n\r\nconst myCanvas = new _utils_class_canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"](512, 512);\r\nmyCanvas.init(data);\r\n\r\nconst domCanvas = document.querySelector('canvas');\r\n\r\n// Set color\r\n\r\nconst currentColor = document.getElementById('current-color');\r\nconst currentInputColor = document.getElementById('current-color-input');\r\ncurrentInputColor.addEventListener('change', (e) => { currentColor.style.background = myCanvas.setColor(e); });\r\n\r\n// Events\r\n\r\ndomCanvas.addEventListener('mousedown', (e) => myCanvas.toolBehavior(e));\r\ndomCanvas.addEventListener('mousemove', (e) => myCanvas.pencilDraw(e));\r\ndocument.addEventListener('mouseup', () => { myCanvas.isDrawing = false; });\r\n\r\n// Select the tool\r\n\r\nconst tools = document.querySelector('.tools');\r\ntools.addEventListener('click', (e) => myCanvas.selectTool(tools, e));\r\n\r\n// Keyboard control\r\n\r\ndocument.addEventListener('keydown', (e) => myCanvas.keyboardControl(tools.querySelector('input[checked]'), e));\r\n\r\n// Set image on canvas on click\r\n\r\nconst myButton = document.createElement('button');\r\nmyButton.setAttribute('type', 'button');\r\nmyButton.innerText = 'Load';\r\ndocument.querySelector('main').appendChild(myButton);\r\nmyButton.addEventListener('click', async () => {\r\n    let myUrl = await Object(_utils_image_api__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n    myCanvas.drawImageOnCanvas(myUrl);\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/class-canvas.js":
/*!***********************************!*\
  !*** ./src/utils/class-canvas.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas {\r\n    constructor(width, height) {\r\n        this.canvas = document.createElement('canvas');\r\n        this.tool = 'pencil';\r\n        this.width = width;\r\n        this.height = height;\r\n        this.isDrawing = false;\r\n        this.ctx = this.canvas.getContext('2d');\r\n        this.selectedColor = 'rgba(128,128,128,1)';\r\n        this.scaleX = 1;\r\n        this.scaleX = 1;\r\n    }\r\n\r\n    init(data) {\r\n        this.canvas.setAttribute('id', 'canvas');\r\n        this.canvas.setAttribute('width', this.width);\r\n        this.canvas.setAttribute('height', this.height);\r\n\r\n        document.querySelector('.canvases').appendChild(this.canvas);\r\n\r\n        this._getFromLS(data);\r\n        this._customPointer();\r\n        document.addEventListener('click', () => this._saveToLS());\r\n    }\r\n\r\n    setColor(e) {\r\n        this.selectedColor = e.target.value;\r\n        this._saveToLS();\r\n        return this.selectedColor;\r\n    }\r\n\r\n    selectTool(tools, e) {\r\n        this.tool = e.target.value;\r\n        if (e.path.length > 7 && tools.querySelector('input[checked]') !== null) {\r\n            tools.querySelector('input[checked]').removeAttribute('checked');\r\n        }\r\n\r\n        e.target.setAttribute('checked', '');\r\n        e.stopPropagation();\r\n        this._saveToLS();\r\n    }\r\n\r\n    toolBehavior(e) {\r\n        switch (this.tool) {\r\n            case 'pencil':\r\n                this.isDrawing = true;\r\n                this.pencilDraw(e);\r\n                break;\r\n            case 'paint-bucket':\r\n                this.floodFill(e.offsetX, e.offsetY, this.selectedColor);\r\n                break;\r\n            case 'color-picker':\r\n                this.pickColor(e);\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n    }\r\n\r\n    pencilDraw(e) {\r\n        if (!this.isDrawing) return;\r\n        const x = Math.floor(e.offsetX / this.scaleX);\r\n        const y = Math.floor(e.offsetY / this.scaleY);\r\n        this.ctx.fillStyle = this.selectedColor;\r\n        this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);\r\n    }\r\n\r\n    pickColor(e) {\r\n        const colorArray = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;\r\n        this.selectedColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] / 255)})`;\r\n        const currentColor = document.getElementById('current-color');\r\n        currentColor.style.background = this.selectedColor;\r\n    }\r\n\r\n    floodFill(x, y, fillColor) {\r\n        const getPixel = (imageData, x, y) => {\r\n            const valueX = Math.floor(x / this.scaleX);\r\n            const valueY = Math.floor(y / this.scaleY);\r\n            return imageData[valueY * 4 + valueX];\r\n        };\r\n\r\n        const setPixel = (imageData, x, y, color) => {\r\n            const setPixelImageData = imageData;\r\n            const valueX = Math.floor(x / this.scaleX);\r\n            const valueY = Math.floor(y / this.scaleY);\r\n            this.ctx.fillStyle = color;\r\n            this.ctx.fillRect(valueX * this.scaleX, valueY * this.scaleY, this.scaleX, this.scaleY);\r\n            setPixelImageData[valueY * 4 + valueX] = color;\r\n            return setPixelImageData;\r\n        };\r\n\r\n        const fillPixel = (imageData, x, y, targetColor, fillColor) => {\r\n            const currentColor = getPixel(imageData, x, y);\r\n\r\n            if ((currentColor === targetColor) && x > 0 && y > 0) {\r\n                setPixel(imageData, x, y, fillColor);\r\n                fillPixel(imageData, x + this.scaleX, y, targetColor, fillColor);\r\n                fillPixel(imageData, x - this.scaleX, y, targetColor, fillColor);\r\n                fillPixel(imageData, x, y + this.scaleY, targetColor, fillColor);\r\n                fillPixel(imageData, x, y - this.scaleY, targetColor, fillColor);\r\n            }\r\n        };\r\n\r\n        const imageData = this._imageConverter();\r\n        const targetColor = getPixel(imageData, x, y);\r\n        if (targetColor !== fillColor) {\r\n            fillPixel(imageData, x, y, targetColor, fillColor);\r\n        }\r\n\r\n        const finalImageData = [];\r\n        const cutImageData = imageData;\r\n        while (cutImageData.length > 0) {\r\n            finalImageData.push(cutImageData.splice(0, 4));\r\n        }\r\n        this._setImage(finalImageData);\r\n    }\r\n\r\n\r\n    keyboardControl(tool, e) {\r\n        if (e.code === 'KeyP' || e.code === 'KeyC' || e.code === 'KeyB') {\r\n            tool.removeAttribute('checked');\r\n\r\n            switch (e.code) {\r\n                case 'KeyP':\r\n                    this.tool = document.getElementById('pencil').value;\r\n                    document.getElementById('pencil').setAttribute('checked', '');\r\n                    break;\r\n                case 'KeyB':\r\n                    this.tool = document.getElementById('paint-bucket').value;\r\n                    document.getElementById('paint-bucket').setAttribute('checked', '');\r\n                    break;\r\n                case 'KeyC':\r\n                    this.tool = document.getElementById('color-picker').value;\r\n                    document.getElementById('color-picker').setAttribute('checked', '');\r\n                    break;\r\n                default:\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n\r\n    _setImage(data) {\r\n        const dataWidth = data[0].length;\r\n        const dataHeight = data.length;\r\n\r\n        this.scaleX = this.canvas.width / dataWidth;\r\n        this.scaleY = this.canvas.height / dataHeight;\r\n\r\n        for (let row = 0; row < dataHeight; row += 1) {\r\n            for (let col = 0; col < dataWidth; col += 1) {\r\n                this.ctx.fillStyle = data[row][col];\r\n                this.ctx.fillRect(col * this.scaleX, row * this.scaleY, this.scaleX, this.scaleY);\r\n            }\r\n        }\r\n    }\r\n\r\n    _customPointer() {\r\n        this.canvas.addEventListener('mouseover', () => {\r\n            switch (this.tool) {\r\n                case 'pencil':\r\n                    this.canvas.style.cursor = 'url(../assets/cursors/pencil.png), default';\r\n                    break;\r\n                case 'paint-bucket':\r\n                    this.canvas.style.cursor = 'url(../assets/cursors/paint-bucket.png), default';\r\n                    break;\r\n                case 'color-picker':\r\n                    this.canvas.style.cursor = 'url(../assets/cursors/color-picker.png), default';\r\n                    break;\r\n                default:\r\n                    break;\r\n            }\r\n        });\r\n    }\r\n\r\n    _saveToLS() {\r\n        localStorage.setItem('canvas', this.canvas.toDataURL());\r\n        localStorage.setItem('color', this.selectedColor);\r\n        localStorage.setItem('tool', this.tool);\r\n    }\r\n\r\n    _getFromLS(data) {\r\n        // Setting image on canvas\r\n\r\n        if (localStorage.getItem('canvas')) {\r\n            let dataURL = localStorage.getItem('canvas');\r\n            let img = new Image;\r\n            img.src = dataURL;\r\n            img.onload = () => {\r\n                this.ctx.drawImage(img, 0, 0, this.width, this.height);\r\n                this._setImage(data);\r\n            }\r\n        } else {\r\n            this._setImage(data);\r\n        }\r\n\r\n        // Setting tool\r\n\r\n\r\n        if (localStorage.getItem('tool')) {\r\n            this.tool = localStorage.getItem('tool');\r\n            document.getElementById(this.tool).setAttribute('checked', '');\r\n        } else {\r\n            this.tool = 'pencil';\r\n            document.getElementById(this.tool).setAttribute('checked', '');\r\n        }\r\n\r\n        // Setting color\r\n\r\n        if (localStorage.getItem('color')) {\r\n            this.selectedColor = localStorage.getItem('color');\r\n            document.getElementById('current-color').style.background = this.selectedColor;\r\n        } else {\r\n            this.selectedColor = 'rgba(128,128,128,1)';\r\n            document.getElementById('current-color').style.background = this.selectedColor;\r\n        }\r\n    }\r\n\r\n    _imageConverter() {\r\n        const bigImageData = this.ctx.getImageData(0, 0, this.height, this.width).data;\r\n        const imageData = [];\r\n        const stepYLimit = this.height * this.width * 4;\r\n        for (let stepY = 0; stepY < stepYLimit; stepY += this.width * this.scaleY * 4) {\r\n            for (let stepX = stepY; stepX < stepY + this.width * 4; stepX += this.scaleX * 4) {\r\n                imageData.push(`rgba(${bigImageData[stepX + 0]},${bigImageData[stepX + 1]},${bigImageData[stepX + 2]},${(bigImageData[stepX + 3] / 255)})`);\r\n            }\r\n        }\r\n        return imageData;\r\n    }\r\n\r\n    drawImageOnCanvas(unsplashUrl) {\r\n        const extImage = new Image();\r\n        extImage.crossOrigin = \"Anonymous\";\r\n        extImage.src = unsplashUrl;\r\n        let imageScale = 1;\r\n        extImage.onload = () => {\r\n            if (extImage.width >= extImage.height) {\r\n                imageScale = extImage.width / this.width;\r\n                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {\r\n                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {\r\n                        this.ctx.drawImage(extImage, sx, sy, this.scaleX * imageScale, this.scaleY * imageScale, sx / imageScale, sy / imageScale + (this.height / 2 - extImage.height / (2 * imageScale)), this.scaleX, this.scaleY);\r\n                    }\r\n                }\r\n            } else {\r\n                imageScale = extImage.height / this.height;\r\n                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {\r\n                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {\r\n                        this.ctx.drawImage(extImage, sx, sy, this.scaleX * imageScale, this.scaleY * imageScale, sx / imageScale + (this.width / 2 - extImage.width / (2 * imageScale)), sy / imageScale, this.scaleX, this.scaleY);\r\n                    }\r\n                }\r\n            }\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/class-canvas.js?");

/***/ }),

/***/ "./src/utils/image-api.js":
/*!********************************!*\
  !*** ./src/utils/image-api.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return unsplashUrl; });\n\r\nasync function unsplashUrl() {\r\n    const url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=196b80d7ba2c92d42c480c466d9896b09909ffb5fc28847b1dcd980fb4b63e44';\r\n    let imageProm = await fetch(url);\r\n    let imageJson = await imageProm.json();\r\n    return await imageJson.urls.small;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/image-api.js?");

/***/ })

/******/ });