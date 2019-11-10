const data = [
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
];


const canvas_4x4 = document.querySelector('#canvas_4x4');

const ctx = canvas_4x4.getContext('2d');

let width = data[0].length;
let height = data.length;
let scaleX = canvas_4x4.width / width;
let scaleY = canvas_4x4.height / height;

for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        ctx.fillStyle = data[row][col];
        let m = ctx.fillStyle;
        ctx.fillRect(col * scaleX, row * scaleY, scaleX, scaleY);
    }
}

// Select the tool

let selectedTool = "pencil";
let selectedColor = '#808080';

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


// Set color

let currentColor = document.getElementById('current-color');
let currentInputColor = document.getElementById('current-color-input');
currentInputColor.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    currentColor.style.background = selectedColor;
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
}

// Handle mouse events

canvas_4x4.addEventListener('mousedown', (e) => {
    switch (selectedTool) {
        case 'pencil':
            isDrawing = true;
            pencilDraw(e);
            break;
        case 'paint-bucket':
            console.log('paint-bucket', selectedTool);

            break;
        case 'color-picker':
            console.log('color-picker', selectedTool);
            pickColor(e);
            break;

    }
});
canvas_4x4.addEventListener('mousemove', pencilDraw);
document.addEventListener('mouseup', () => isDrawing = false);






