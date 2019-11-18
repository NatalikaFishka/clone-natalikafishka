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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_static_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/static-data */ \"./src/utils/static-data.js\");\n/* harmony import */ var _utils_class_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/class-canvas */ \"./src/utils/class-canvas.js\");\n/* harmony import */ var _utils_image_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/image-api */ \"./src/utils/image-api.js\");\n/* harmony import */ var _utils_search_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/search-bar */ \"./src/utils/search-bar.js\");\n\n\n\n\n\nconst myCanvas = new _utils_class_canvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"](512, 512);\nmyCanvas.init(_utils_static_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"]);\n\nconst domCanvas = document.querySelector('canvas');\n\n// Set color\n\nconst currentColor = document.getElementById('current-color');\nconst currentInputColor = document.getElementById('current-color-input');\ncurrentInputColor.addEventListener('change', (e) => { currentColor.style.background = myCanvas.setColor(e); });\n\n// Events\n\ndomCanvas.addEventListener('mousedown', (e) => myCanvas.toolBehavior(e));\ndomCanvas.addEventListener('mousemove', (e) => myCanvas.pencilDraw(e));\ndocument.addEventListener('mouseup', () => { myCanvas.isDrawing = false; });\n\n// Select the tool\n\nconst tools = document.querySelector('.tools');\ntools.addEventListener('click', (e) => myCanvas.selectTool(tools, e));\n\n// Keyboard control\n\ndocument.addEventListener('keydown', (e) => myCanvas.keyboardControl(tools.querySelector('input[checked]'), e));\n\n// Set search town component\n\nconst mySearchBar = new _utils_search_bar__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nmySearchBar.init();\nconst domSearchBar = document.querySelector('#searchbar');\ndomSearchBar.addEventListener('keyup', () => mySearchBar.filterCities(_utils_static_data__WEBPACK_IMPORTED_MODULE_0__[\"cities\"]));\n\nconst domLoadBtn = document.querySelector('#load-btn');\ndomLoadBtn.addEventListener('click', async () => {\n    const myUrl = await Object(_utils_image_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(mySearchBar.cityInput);\n    myCanvas.drawImageOnCanvas(myUrl);\n});\n\n\n// Covert image to B&W\n\nconst domBWBtn = document.querySelector('#bw-btn');\ndomBWBtn.addEventListener('click', () => {\n    console.log(\"CLICKED\");\n    myCanvas.toGrayScale();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/class-canvas.js":
/*!***********************************!*\
  !*** ./src/utils/class-canvas.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas {\n    constructor(width, height) {\n        this.canvas = document.createElement('canvas');\n        this.tool = 'pencil';\n        this.width = width;\n        this.height = height;\n        this.isDrawing = false;\n        this.ctx = this.canvas.getContext('2d');\n        this.selectedColor = 'rgba(128,128,128,1)';\n        this.scaleX = 1;\n        this.scaleX = 1;\n    }\n\n    init(data) {\n        this.canvas.setAttribute('id', 'canvas');\n        this.canvas.setAttribute('width', this.width);\n        this.canvas.setAttribute('height', this.height);\n\n        document.querySelector('.canvases').appendChild(this.canvas);\n\n        this._getFromLS(data);\n        this._customPointer();\n        document.addEventListener('click', () => this._saveToLS());\n    }\n\n    setColor(e) {\n        this.selectedColor = e.target.value;\n        this._saveToLS();\n        return this.selectedColor;\n    }\n\n    selectTool(tools, e) {\n        this.tool = e.target.value;\n        if (e.path.length > 7 && tools.querySelector('input[checked]') !== null) {\n            tools.querySelector('input[checked]').removeAttribute('checked');\n        }\n\n        e.target.setAttribute('checked', '');\n        e.stopPropagation();\n        this._saveToLS();\n    }\n\n    toolBehavior(e) {\n        switch (this.tool) {\n            case 'pencil':\n                this.isDrawing = true;\n                this.pencilDraw(e);\n                break;\n            case 'paint-bucket':\n                this.floodFill(e.offsetX, e.offsetY, this.selectedColor);\n                break;\n            case 'color-picker':\n                this.pickColor(e);\n                break;\n            default:\n                break;\n        }\n    }\n\n    pencilDraw(e) {\n        if (!this.isDrawing) return;\n        const x = Math.floor(e.offsetX / this.scaleX);\n        const y = Math.floor(e.offsetY / this.scaleY);\n        this.ctx.fillStyle = this.selectedColor;\n        this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);\n    }\n\n    pickColor(e) {\n        const colorArray = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;\n        this.selectedColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] / 255)})`;\n        const currentColor = document.getElementById('current-color');\n        currentColor.style.background = this.selectedColor;\n    }\n\n    floodFill(x, y, fillColor) {\n        const getPixel = (imageData, x, y) => {\n            const valueX = Math.floor(x / this.scaleX);\n            const valueY = Math.floor(y / this.scaleY);\n            return imageData[valueY * 4 + valueX];\n        };\n\n        const setPixel = (imageData, x, y, color) => {\n            const setPixelImageData = imageData;\n            const valueX = Math.floor(x / this.scaleX);\n            const valueY = Math.floor(y / this.scaleY);\n            this.ctx.fillStyle = color;\n            this.ctx.fillRect(valueX * this.scaleX, valueY * this.scaleY, this.scaleX, this.scaleY);\n            setPixelImageData[valueY * 4 + valueX] = color;\n            return setPixelImageData;\n        };\n\n        const fillPixel = (imageData, x, y, targetColor, fillColor) => {\n            const currentColor = getPixel(imageData, x, y);\n\n            if ((currentColor === targetColor) && x > 0 && y > 0) {\n                setPixel(imageData, x, y, fillColor);\n                fillPixel(imageData, x + this.scaleX, y, targetColor, fillColor);\n                fillPixel(imageData, x - this.scaleX, y, targetColor, fillColor);\n                fillPixel(imageData, x, y + this.scaleY, targetColor, fillColor);\n                fillPixel(imageData, x, y - this.scaleY, targetColor, fillColor);\n            }\n        };\n\n        const imageData = this._imageConverter();\n        const targetColor = getPixel(imageData, x, y);\n        if (targetColor !== fillColor) {\n            fillPixel(imageData, x, y, targetColor, fillColor);\n        }\n\n        const finalImageData = [];\n        const cutImageData = imageData;\n        while (cutImageData.length > 0) {\n            finalImageData.push(cutImageData.splice(0, 4));\n        }\n        this._setImage(finalImageData);\n    }\n\n    keyboardControl(tool, e) {\n        if (e.code === 'KeyP' || e.code === 'KeyC' || e.code === 'KeyB') {\n            tool.removeAttribute('checked');\n\n            switch (e.code) {\n                case 'KeyP':\n                    this.tool = document.getElementById('pencil').value;\n                    document.getElementById('pencil').setAttribute('checked', '');\n                    break;\n                case 'KeyB':\n                    this.tool = document.getElementById('paint-bucket').value;\n                    document.getElementById('paint-bucket').setAttribute('checked', '');\n                    break;\n                case 'KeyC':\n                    this.tool = document.getElementById('color-picker').value;\n                    document.getElementById('color-picker').setAttribute('checked', '');\n                    break;\n                default:\n                    break;\n            }\n        }\n    }\n\n    drawImageOnCanvas(unsplashUrl) {\n        const extImage = new Image();\n        extImage.crossOrigin = 'Anonymous';\n        extImage.src = unsplashUrl;\n        let imageScale = 1;\n        let extImageStartX = 0;\n        let extImageStartY = 0;\n        extImage.onload = () => {\n            if (extImage.width >= extImage.height) {\n                imageScale = extImage.width / this.width;\n                extImageStartY = this.height / 2 - extImage.height / (2 * imageScale);\n                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {\n                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {\n                        this.ctx.drawImage(\n                            extImage,\n                            sx,\n                            sy,\n                            this.scaleX * imageScale,\n                            this.scaleY * imageScale,\n                            sx / imageScale,\n                            sy / imageScale + extImageStartY,\n                            this.scaleX,\n                            this.scaleY,\n                        );\n                    }\n                }\n            } else {\n                imageScale = extImage.height / this.height;\n                extImageStartX = this.width / 2 - extImage.width / (2 * imageScale);\n                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {\n                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {\n                        this.ctx.drawImage(\n                            extImage,\n                            sx,\n                            sy,\n                            this.scaleX * imageScale,\n                            this.scaleY * imageScale,\n                            sx / imageScale + extImageStartX,\n                            sy / imageScale,\n                            this.scaleX,\n                            this.scaleY,\n                        );\n                    }\n                }\n            }\n        };\n    }\n\n    toGrayScale() {\n        const imageToConvert = this.ctx.getImageData(0, 0, this.height, this.width);\n        for (let j = 0; j < imageToConvert.height; j += 1) {\n            for (let i = 0; i < imageToConvert.width; i += 1) {\n                let index = (i * 4) * imageToConvert.width + (j * 4);\n                let red = imageToConvert.data[index + 0];\n                let green = imageToConvert.data[index + 1];\n                let blue = imageToConvert.data[index + 2];\n                let alpha = imageToConvert.data[index + 3];\n                let average = (red + green + blue) / 3;\n\n                imageToConvert.data[index + 0] = average;\n                imageToConvert.data[index + 1] = average;\n                imageToConvert.data[index + 2] = average;\n                imageToConvert.data[index + 3] = alpha;\n            }\n        }\n        this.ctx.putImageData(imageToConvert, 0, 0);\n    }\n\n    _setImage(data) {\n        const dataWidth = data[0].length;\n        const dataHeight = data.length;\n\n        this.scaleX = this.canvas.width / dataWidth;\n        this.scaleY = this.canvas.height / dataHeight;\n\n        for (let row = 0; row < dataHeight; row += 1) {\n            for (let col = 0; col < dataWidth; col += 1) {\n                this.ctx.fillStyle = data[row][col];\n                this.ctx.fillRect(col * this.scaleX, row * this.scaleY, this.scaleX, this.scaleY);\n            }\n        }\n    }\n\n    _customPointer() {\n        this.canvas.addEventListener('mouseover', () => {\n            switch (this.tool) {\n                case 'pencil':\n                    this.canvas.style.cursor = 'url(../assets/cursors/pencil.png), default';\n                    break;\n                case 'paint-bucket':\n                    this.canvas.style.cursor = 'url(../assets/cursors/paint-bucket.png), default';\n                    break;\n                case 'color-picker':\n                    this.canvas.style.cursor = 'url(../assets/cursors/color-picker.png), default';\n                    break;\n                default:\n                    break;\n            }\n        });\n    }\n\n    _saveToLS() {\n        localStorage.setItem('canvas', this.canvas.toDataURL());\n        localStorage.setItem('color', this.selectedColor);\n        localStorage.setItem('tool', this.tool);\n    }\n\n    _getFromLS(data) {\n        // Setting image on canvas\n\n        if (localStorage.getItem('canvas')) {\n            const dataURL = localStorage.getItem('canvas');\n            const img = new Image();\n            img.src = dataURL;\n            img.onload = () => {\n                this.ctx.drawImage(img, 0, 0, this.width, this.height);\n                this._setImage(data);\n            };\n        } else {\n            this._setImage(data);\n        }\n\n        // Setting tool\n\n\n        if (localStorage.getItem('tool')) {\n            this.tool = localStorage.getItem('tool');\n            document.getElementById(this.tool).setAttribute('checked', '');\n        } else {\n            this.tool = 'pencil';\n            document.getElementById(this.tool).setAttribute('checked', '');\n        }\n\n        // Setting color\n\n        if (localStorage.getItem('color')) {\n            this.selectedColor = localStorage.getItem('color');\n            document.getElementById('current-color').style.background = this.selectedColor;\n        } else {\n            this.selectedColor = 'rgba(128,128,128,1)';\n            document.getElementById('current-color').style.background = this.selectedColor;\n        }\n    }\n\n    _imageConverter() {\n        const bigImageData = this.ctx.getImageData(0, 0, this.height, this.width).data;\n        const imageData = [];\n        const stepYLimit = this.height * this.width * 4;\n        for (let stepY = 0; stepY < stepYLimit; stepY += this.width * this.scaleY * 4) {\n            for (let stepX = stepY; stepX < stepY + this.width * 4; stepX += this.scaleX * 4) {\n                imageData.push(`rgba(${bigImageData[stepX + 0]},${bigImageData[stepX + 1]},${bigImageData[stepX + 2]},${(bigImageData[stepX + 3] / 255)})`);\n            }\n        }\n        return imageData;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/class-canvas.js?");

/***/ }),

/***/ "./src/utils/image-api.js":
/*!********************************!*\
  !*** ./src/utils/image-api.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return unsplashUrl; });\n\nasync function unsplashUrl(town) {\n    const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=196b80d7ba2c92d42c480c466d9896b09909ffb5fc28847b1dcd980fb4b63e44`;\n    const imageProm = await fetch(url);\n    const imageJson = await imageProm.json();\n    return imageJson.urls.small;\n}\n\n\n//# sourceURL=webpack:///./src/utils/image-api.js?");

/***/ }),

/***/ "./src/utils/search-bar.js":
/*!*********************************!*\
  !*** ./src/utils/search-bar.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SearchBar; });\nclass SearchBar {\n    constructor() {\n        this.container = null;\n        this.loadButton = null;\n        this.searchBarContainer = null;\n        this.searchBar = null;\n        this.searchBarList = null;\n        this.bwButton = null;\n        this.cityInput = null;\n    }\n\n    init() {\n        this.container = document.createElement('div');\n        this.container.classList.add('search-component');\n\n        this.loadButton = document.createElement('button');\n        this.loadButton.classList.add('search-component__load-btn');\n        this.loadButton.setAttribute('id', 'load-btn');\n        this.loadButton.setAttribute('type', 'button');\n        this.loadButton.setAttribute('disabled', '');\n        this.loadButton.innerText = 'Load';\n        this.container.appendChild(this.loadButton);\n\n        this.searchBarContainer = document.createElement('div');\n        this.searchBarContainer.classList.add('search-component__bar-container');\n        this.container.appendChild(this.searchBarContainer);\n\n        this.searchBar = document.createElement('input');\n        this.searchBar.classList.add('search-component__field');\n        this.searchBar.setAttribute('id', 'searchbar');\n        this.searchBar.setAttribute('type', 'text');\n        this.searchBar.setAttribute('name', 'search');\n        this.searchBar.setAttribute('placeholder', 'Search for city');\n        this.searchBarContainer.appendChild(this.searchBar);\n\n        this.bwButton = document.createElement('button');\n        this.bwButton.classList.add('search-component__bw-btn');\n        this.bwButton.setAttribute('id', 'bw-btn');\n        // this.bwButton.setAttribute('disabled', '');\n        this.bwButton.setAttribute('type', 'button');\n        this.bwButton.innerText = 'B&W';\n        this.container.appendChild(this.bwButton);\n\n        document.querySelector('main').appendChild(this.container);\n    }\n\n    filterCities(cities) {\n        if (this.searchBarContainer.querySelector('.cities')) {\n            const nodeToRemove = this.searchBarContainer.querySelector('.cities');\n            this.searchBarContainer.removeChild(nodeToRemove);\n        }\n\n        const inputValue = this.searchBar.value;\n        const filteredCities = cities.filter((city) => city.toLowerCase().includes(inputValue.toLowerCase()));\n\n\n        this.searchBarList = document.createElement('ul');\n        this.searchBarList.classList.add('cities');\n\n        filteredCities.forEach((currentCity) => {\n            const city = document.createElement('p');\n            city.innerText = currentCity;\n            this.searchBarList.appendChild(city);\n        });\n\n        this.searchBarContainer.appendChild(this.searchBarList);\n\n        if (inputValue !== '' && filteredCities.length) {\n            this.searchBar.classList.add('show');\n            this.searchBarList.classList.add('show');\n            this.searchBarList.addEventListener('click', (e) => {\n                if (e.target.nodeName === 'P') {\n                    this.searchBar.value = e.target.textContent;\n                    this.searchBar.classList.remove('show');\n                    this.searchBarList.classList.remove('show');\n                    this._getCityInput(cities);\n                }\n            });\n        } else {\n            this.searchBar.classList.remove('show');\n            this.searchBarList.classList.remove('show');\n        }\n\n        this._getCityInput(cities);\n    }\n\n    _getCityInput(cities) {\n        if (cities.indexOf(this.searchBar.value) > -1) {\n            this.cityInput = this.searchBar.value;\n            this.loadButton.removeAttribute('disabled');\n            this.searchBar.classList.remove('show');\n            this.searchBarList.classList.remove('show');\n        } else {\n            this.loadButton.setAttribute('disabled', '');\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/search-bar.js?");

/***/ }),

/***/ "./src/utils/static-data.js":
/*!**********************************!*\
  !*** ./src/utils/static-data.js ***!
  \**********************************/
/*! exports provided: data, cities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return data; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cities\", function() { return cities; });\nconst data = [\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\n    ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],\n];\n\nconst cities = ['Minsk', 'Moscow', 'Monreal', 'New-York', 'Paris', 'Los Angeles'];\n\n\n//# sourceURL=webpack:///./src/utils/static-data.js?");

/***/ })

/******/ });