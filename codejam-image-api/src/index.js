import Canvas from './utils/class-canvas';

const data = [
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
];

const myCanvas = new Canvas(512, 512);
myCanvas.init(data);

const domCanvas = document.querySelector('canvas');

// Set color

const currentColor = document.getElementById('current-color');
const currentInputColor = document.getElementById('current-color-input');
currentInputColor.addEventListener('change', (e) => { currentColor.style.background = myCanvas.setColor(e); });

// Events

domCanvas.addEventListener('mousedown', (e) => myCanvas.toolBehavior(e));
domCanvas.addEventListener('mousemove', (e) => myCanvas.pencilDraw(e));
document.addEventListener('mouseup', () => { myCanvas.isDrawing = false; });

// Select the tool

const tools = document.querySelector('.tools');
tools.addEventListener('click', (e) => myCanvas.selectTool(tools, e));

// Keyboard control

document.addEventListener('keydown', (e) => myCanvas.keyboardControl(tools.querySelector('input[checked]'), e));

// Set image on canvas on click

const myButton = document.createElement('button');
myButton.setAttribute('type', 'button');
myButton.innerText = 'Load';
document.querySelector('.canvases').appendChild(myButton);
myButton.addEventListener('click', () => myCanvas.drawImageOnCanvas());
