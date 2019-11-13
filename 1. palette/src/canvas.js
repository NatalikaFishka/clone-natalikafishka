import Canvas from './utils/class-canvas';

const data = [
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
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
