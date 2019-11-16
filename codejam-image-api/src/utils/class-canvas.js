export default class Canvas {
    constructor(width, height) {
        this.canvas = document.createElement('canvas');
        this.tool = 'pencil';
        this.width = width;
        this.height = height;
        this.isDrawing = false;
        this.ctx = this.canvas.getContext('2d');
        this.selectedColor = 'rgba(128,128,128,1)';
        this.scaleX = 1;
        this.scaleX = 1;
    }

    init(data) {
        this.canvas.setAttribute('id', 'canvas');
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        document.querySelector('.canvases').appendChild(this.canvas);

        this._getFromLS(data);
        this._customPointer();
        document.addEventListener('click', () => this._saveToLS());
    }

    setColor(e) {
        this.selectedColor = e.target.value;
        this._saveToLS();
        return this.selectedColor;
    }

    selectTool(tools, e) {
        this.tool = e.target.value;
        if (e.path.length > 7 && tools.querySelector('input[checked]') !== null) {
            tools.querySelector('input[checked]').removeAttribute('checked');
        }

        e.target.setAttribute('checked', '');
        e.stopPropagation();
        this._saveToLS();
    }

    toolBehavior(e) {
        switch (this.tool) {
            case 'pencil':
                this.isDrawing = true;
                this.pencilDraw(e);
                break;
            case 'paint-bucket':
                this.floodFill(e.offsetX, e.offsetY, this.selectedColor);
                break;
            case 'color-picker':
                this.pickColor(e);
                break;
            default:
                break;
        }
    }

    pencilDraw(e) {
        if (!this.isDrawing) return;
        const x = Math.floor(e.offsetX / this.scaleX);
        const y = Math.floor(e.offsetY / this.scaleY);
        this.ctx.fillStyle = this.selectedColor;
        this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
    }

    pickColor(e) {
        const colorArray = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        this.selectedColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] / 255)})`;
        const currentColor = document.getElementById('current-color');
        currentColor.style.background = this.selectedColor;
    }

    floodFill(x, y, fillColor) {
        const getPixel = (imageData, x, y) => {
            const valueX = Math.floor(x / this.scaleX);
            const valueY = Math.floor(y / this.scaleY);
            return imageData[valueY * 4 + valueX];
        };

        const setPixel = (imageData, x, y, color) => {
            const setPixelImageData = imageData;
            const valueX = Math.floor(x / this.scaleX);
            const valueY = Math.floor(y / this.scaleY);
            this.ctx.fillStyle = color;
            this.ctx.fillRect(valueX * this.scaleX, valueY * this.scaleY, this.scaleX, this.scaleY);
            setPixelImageData[valueY * 4 + valueX] = color;
            return setPixelImageData;
        };

        const fillPixel = (imageData, x, y, targetColor, fillColor) => {
            const currentColor = getPixel(imageData, x, y);

            if ((currentColor === targetColor) && x > 0 && y > 0) {
                setPixel(imageData, x, y, fillColor);
                fillPixel(imageData, x + this.scaleX, y, targetColor, fillColor);
                fillPixel(imageData, x - this.scaleX, y, targetColor, fillColor);
                fillPixel(imageData, x, y + this.scaleY, targetColor, fillColor);
                fillPixel(imageData, x, y - this.scaleY, targetColor, fillColor);
            }
        };

        const imageData = this._imageConverter();
        const targetColor = getPixel(imageData, x, y);
        if (targetColor !== fillColor) {
            fillPixel(imageData, x, y, targetColor, fillColor);
        }

        const finalImageData = [];
        const cutImageData = imageData;
        while (cutImageData.length > 0) {
            finalImageData.push(cutImageData.splice(0, 4));
        }
        this._setImage(finalImageData);
    }


    keyboardControl(tool, e) {
        if (e.code === 'KeyP' || e.code === 'KeyC' || e.code === 'KeyB') {
            tool.removeAttribute('checked');

            switch (e.code) {
                case 'KeyP':
                    this.tool = document.getElementById('pencil').value;
                    document.getElementById('pencil').setAttribute('checked', '');
                    break;
                case 'KeyB':
                    this.tool = document.getElementById('paint-bucket').value;
                    document.getElementById('paint-bucket').setAttribute('checked', '');
                    break;
                case 'KeyC':
                    this.tool = document.getElementById('color-picker').value;
                    document.getElementById('color-picker').setAttribute('checked', '');
                    break;
                default:
                    break;
            }
        }
    }

    _setImage(data) {
        const dataWidth = data[0].length;
        const dataHeight = data.length;

        this.scaleX = this.canvas.width / dataWidth;
        this.scaleY = this.canvas.height / dataHeight;

        for (let row = 0; row < dataHeight; row += 1) {
            for (let col = 0; col < dataWidth; col += 1) {
                this.ctx.fillStyle = data[row][col];
                this.ctx.fillRect(col * this.scaleX, row * this.scaleY, this.scaleX, this.scaleY);
            }
        }
    }

    _customPointer() {
        this.canvas.addEventListener('mouseover', () => {
            switch (this.tool) {
                case 'pencil':
                    this.canvas.style.cursor = 'url(../assets/cursors/pencil.png), default';
                    break;
                case 'paint-bucket':
                    this.canvas.style.cursor = 'url(../assets/cursors/paint-bucket.png), default';
                    break;
                case 'color-picker':
                    this.canvas.style.cursor = 'url(../assets/cursors/color-picker.png), default';
                    break;
                default:
                    break;
            }
        });
    }

    _saveToLS() {
        localStorage.setItem('canvas', this._imageConverter());
        localStorage.setItem('color', this.selectedColor);
        localStorage.setItem('tool', this.tool);
    }

    _getFromLS(data) {
        // Setting image on canvas

        if (localStorage.getItem('canvas')) {
            let customData = localStorage.getItem('canvas');
            customData = customData.replace(/\)/gm, '))');
            customData = customData.substr(0, customData.length - 1);
            customData = customData.split('),');
            const finalCustomData = [];
            while (customData.length > 0) {
                finalCustomData.push(customData.splice(0, 4));
            }
            this._setImage(finalCustomData);
        } else {
            this._setImage(data);
        }
        // Setting tool


        if (localStorage.getItem('tool')) {
            this.tool = localStorage.getItem('tool');
            document.getElementById(this.tool).setAttribute('checked', '');
        } else {
            this.tool = 'pencil';
            document.getElementById(this.tool).setAttribute('checked', '');
        }

        // Setting color

        if (localStorage.getItem('color')) {
            this.selectedColor = localStorage.getItem('color');
            document.getElementById('current-color').style.background = this.selectedColor;
        } else {
            this.selectedColor = 'rgba(128,128,128,1)';
            document.getElementById('current-color').style.background = this.selectedColor;
        }
    }

    _imageConverter() {
        const bigImageData = this.ctx.getImageData(0, 0, this.height, this.width).data;
        const imageData = [];
        const stepYLimit = this.height * this.width * 4;
        for (let stepY = 0; stepY < stepYLimit; stepY += this.width * this.scaleY * 4) {
            for (let stepX = stepY; stepX < stepY + this.width * 4; stepX += this.scaleX * 4) {
                imageData.push(`rgba(${bigImageData[stepX + 0]},${bigImageData[stepX + 1]},${bigImageData[stepX + 2]},${(bigImageData[stepX + 3] / 255)})`);
            }
        }
        return imageData;
    }

    drawImageOnCanvas() {
        const extImage = new Image();
        // this._getImageURL();
        // extImage.src = this.dataImage;
        extImage.src = '../assets/images/image.png';

        let imageScale = 1;
        extImage.onload = () => {
            if (extImage.width >= extImage.height) {
                imageScale = extImage.width / this.width;
                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {
                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {
                        this.ctx.drawImage(extImage, sx, sy, this.scaleX * imageScale, this.scaleY * imageScale, sx / imageScale, sy / imageScale + (this.height / 2 - extImage.height / (2 * imageScale)), this.scaleX, this.scaleY);
                    }
                }
            } else {
                imageScale = extImage.height / this.height;
                for (let sy = 0; sy < extImage.height; sy += this.scaleY * imageScale) {
                    for (let sx = 0; sx < extImage.width; sx += this.scaleX * imageScale) {
                        this.ctx.drawImage(extImage, sx, sy, this.scaleX * imageScale, this.scaleY * imageScale, sx / imageScale + (this.width / 2 - extImage.width / (2 * imageScale)), sy / imageScale, this.scaleX, this.scaleY);
                    }
                }
            }
        };
    }

    _getImageURL() {
        const url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=196b80d7ba2c92d42c480c466d9896b09909ffb5fc28847b1dcd980fb4b63e44';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.dataImage = data.urls.small;
            });
        return this.dataImage;
    }
}
