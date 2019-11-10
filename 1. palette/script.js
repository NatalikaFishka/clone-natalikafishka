const data = [
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
];


const canvas_4x4 = document.querySelector('#canvas_4x4');

const ctx = canvas_4x4.getContext('2d');


let scaleX = canvas_4x4.width / data[0].length;
let scaleY = canvas_4x4.height / data.length;

function fillCanvas(data) {
    let width = data[0].length;
    let height = data.length;
    let scaleX = canvas_4x4.width / width;
    let scaleY = canvas_4x4.height / height;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            ctx.fillStyle = data[row][col];
            ctx.fillRect(col * scaleX, row * scaleY, scaleX, scaleY);
        }
    }
}

// Load data from local storage if any

if (localStorage.getItem('canvas')) {
    let customData = localStorage.getItem('canvas');
    customData = customData.replace(/\)/gm, "))");
    customData = customData.substr(0, customData.length - 1);
    customData = customData.split('),')
    let finalCustomData = [];
    while (customData.length > 0) {
        finalCustomData.push(customData.splice(0, 4));
    }
    fillCanvas(finalCustomData);
} else {
    fillCanvas(data);
}

let selectedTool;
let selectedColor;

if (localStorage.getItem('tool')) {
    selectedTool = localStorage.getItem('tool');
    document.getElementById(selectedTool).setAttribute('checked', '');
} else {
    selectedTool = "pencil";
    document.getElementById(selectedTool).setAttribute('checked', '');
}


if (localStorage.getItem('color')) {
    selectedColor = localStorage.getItem('color');
    document.getElementById('current-color').style.background = selectedColor;
} else {
    selectedColor = 'rgba(128,128,128,1)';
    document.getElementById('current-color').style.background = selectedColor;
}

// Set color

let currentColor = document.getElementById('current-color');
let currentInputColor = document.getElementById('current-color-input');
currentInputColor.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    currentColor.style.background = selectedColor;
});

// Select the tool

const selectedTools = (tool) => {
    for (let i = 0; i < tool.length; i++) {
        tool[i].addEventListener('click', function () {
            for (k = 0; k < tool.length; k++) {
                tool[k].removeAttribute('checked');
            }
            selectedTool = tool[i].value;
            tool[i].setAttribute('checked', '');
        });
    }
}

let tool = document.querySelectorAll('.tool');
selectedTools(tool);

// Custom pointer

canvas_4x4.addEventListener('mouseover', () => {
    switch (selectedTool) {
        case 'pencil':
            canvas_4x4.style.cursor = 'url(assets/cursors/pencil.png), default';
            break;
        case 'paint-bucket':
            canvas_4x4.style.cursor = 'url(assets/cursors/paint-bucket.png), default';
            break;
        case 'color-picker':
            canvas_4x4.style.cursor = 'url(assets/cursors/color-picker.png), default';
            break;
    }
});

// Draw with pencil

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function pencilDraw(e) {
    if (!isDrawing) return;
    let x = Math.floor(e.offsetX / scaleX);
    let y = Math.floor(e.offsetY / scaleY);
    ctx.fillStyle = selectedColor;
    ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
}

// Pick the color

function pickColor(e) {
    let colorArray = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    selectedColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] / 255)})`;
    currentColor.style.background = selectedColor;
    console.log(selectedColor);
}

// Bucket 

function getPixel(imageData, x, y) {
    let valueX = Math.floor(x / scaleX);
    let valueY = Math.floor(y / scaleY);
    return imageData[valueY * 4 + valueX];
}

function setPixel(imageData, x, y, color) {
    let valueX = Math.floor(x / scaleX);
    let valueY = Math.floor(y / scaleY);
    ctx.fillStyle = color;
    ctx.fillRect(valueX * scaleX, valueY * scaleY, scaleX, scaleY);
    imageData[valueY * 4 + valueX] = color;
}

function colorsMatch(a, b) {
    return a === b;
}

function imageConverter() {
    const bigImageData = ctx.getImageData(0, 0, canvas_4x4.width, canvas_4x4.width).data;
    let imageData = [];
    let stepYLimit = canvas_4x4.height * canvas_4x4.width * 4;
    for (let stepY = 0; stepY < stepYLimit; stepY = stepY + canvas_4x4.width * scaleY * 4) {

        for (let stepX = stepY; stepX < stepY + canvas_4x4.width * 4; stepX = stepX + scaleX * 4) {

            imageData.push(`rgba(${bigImageData[stepX + 0]},${bigImageData[stepX + 1]},${bigImageData[stepX + 2]},${(bigImageData[stepX + 3] / 255)})`);
        }
    }
    return imageData;
}

function floodFill(x, y, fillColor) {

    let imageData = imageConverter();
    const targetColor = getPixel(imageData, x, y);
    if (!colorsMatch(targetColor, fillColor)) {
        fillPixel(imageData, x, y, targetColor, fillColor);
    }

    let finalImageData = [];
    let cutImageData = imageData;
    while (cutImageData.length > 0) {
        finalImageData.push(cutImageData.splice(0, 4));
    }
    fillCanvas(finalImageData);
}

function fillPixel(imageData, x, y, targetColor, fillColor) {

    const currentColor = getPixel(imageData, x, y);
    if (colorsMatch(currentColor, targetColor)) {
        setPixel(imageData, x, y, fillColor);
        fillPixel(imageData, x + scaleX, y, targetColor, fillColor);
        fillPixel(imageData, x - scaleX, y, targetColor, fillColor);
        fillPixel(imageData, x, y + scaleY, targetColor, fillColor);
        fillPixel(imageData, x, y - scaleY, targetColor, fillColor);
    }
}

// Handle mouse events

canvas_4x4.addEventListener('mousedown', (e) => {
    switch (selectedTool) {
        case 'pencil':
            isDrawing = true;
            pencilDraw(e);
            break;
        case 'paint-bucket':
            let startX = e.offsetX;
            let startY = e.offsetY;

            floodFill(startX, startY, selectedColor);
            break;
        case 'color-picker':
            pickColor(e);
            break;
    }
});

canvas_4x4.addEventListener('mousemove', pencilDraw);
document.addEventListener('mouseup', () => isDrawing = false);

// Handle keyboad events

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' || e.code === 'KeyC' || e.code === 'KeyB') {
        console.log(tool)
        console.log(document.getElementById('pencil'))

        for (k = 0; k < tool.length; k++) {
            tool[k].removeAttribute('checked');
        };

        switch (e.code) {
            case 'KeyP':
                selectedTool = document.getElementById('pencil').value;
                document.getElementById('pencil').setAttribute('checked', '');
                break;
            case 'KeyB':
                selectedTool = document.getElementById('paint-bucket').value;
                document.getElementById('paint-bucket').setAttribute('checked', '');
                break;
            case 'KeyC':
                selectedTool = document.getElementById('color-picker').value;
                document.getElementById('color-picker').setAttribute('checked', '');
                break;
            default:
                break;
        }
    }
})

// Save data to lacel storage

document.addEventListener('click', () => {
    localStorage.setItem('canvas', imageConverter());
    localStorage.setItem('tool', selectedTool);
    localStorage.setItem('color', selectedColor);
});
