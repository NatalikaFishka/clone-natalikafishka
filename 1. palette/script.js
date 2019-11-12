const defaultImageData = [
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
];


const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');


const scaleX = canvas.width / defaultImageData[0].length;
const scaleY = canvas.height / defaultImageData.length;

function fillCanvas(data) {
  const width = data[0].length;
  const height = data.length;
  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      ctx.fillStyle = data[row][col];
      ctx.fillRect(col * scaleX, row * scaleY, scaleX, scaleY);
    }
  }
}

// Select the tool


let selectedTool;
let selectedColor;
const tool = document.querySelectorAll('.tool');

function clickHandler(i) {
  for (let k = 0; k < tool.length; k += 1) {
    tool[k].removeAttribute('checked');
  }
  selectedTool = tool[i].value;
  tool[i].setAttribute('checked', '');
}

for (let i = 0; i < tool.length; i += 1) {
  tool[i].addEventListener('click', () => clickHandler(i));
}

// Load data from local storage if any

if (localStorage.getItem('canvas')) {
  let customData = localStorage.getItem('canvas');
  customData = customData.replace(/\)/gm, '))');
  customData = customData.substr(0, customData.length - 1);
  customData = customData.split('),');
  const finalCustomData = [];
  while (customData.length > 0) {
    finalCustomData.push(customData.splice(0, 4));
  }
  fillCanvas(finalCustomData);
} else {
  fillCanvas(defaultImageData);
}


if (localStorage.getItem('tool')) {
  selectedTool = localStorage.getItem('tool');
  document.getElementById(selectedTool).setAttribute('checked', '');
} else {
  selectedTool = 'pencil';
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

const currentColor = document.getElementById('current-color');
const currentInputColor = document.getElementById('current-color-input');
currentInputColor.addEventListener('change', (e) => {
  selectedColor = e.target.value;
  currentColor.style.background = selectedColor;
});


// Custom pointer

canvas.addEventListener('mouseover', () => {
  switch (selectedTool) {
    case 'pencil':
      canvas.style.cursor = 'url(assets/cursors/pencil.png), default';
      break;
    case 'paint-bucket':
      canvas.style.cursor = 'url(assets/cursors/paint-bucket.png), default';
      break;
    case 'color-picker':
      canvas.style.cursor = 'url(assets/cursors/color-picker.png), default';
      break;
    default:
      break;
  }
});

// Draw with pencil

let isDrawing = false;

function pencilDraw(e) {
  if (!isDrawing) return;
  const x = Math.floor(e.offsetX / scaleX);
  const y = Math.floor(e.offsetY / scaleY);
  ctx.fillStyle = selectedColor;
  ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
}

// Pick the color

function pickColor(e) {
  const colorArray = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  selectedColor = `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] / 255)})`;
  currentColor.style.background = selectedColor;
}

// Bucket

function getPixel(imageData, x, y) {
  const valueX = Math.floor(x / scaleX);
  const valueY = Math.floor(y / scaleY);
  return imageData[valueY * 4 + valueX];
}

function setPixel(imageData, x, y, color) {
  const setPixelImageData = imageData;
  const valueX = Math.floor(x / scaleX);
  const valueY = Math.floor(y / scaleY);
  ctx.fillStyle = color;
  ctx.fillRect(valueX * scaleX, valueY * scaleY, scaleX, scaleY);
  setPixelImageData[valueY * 4 + valueX] = color;
  return setPixelImageData;
}

function colorsMatch(a, b) {
  return a === b;
}

function imageConverter() {
  const bigImageData = ctx.getImageData(0, 0, canvas.width, canvas.width).data;
  const imageData = [];
  const stepYLimit = canvas.height * canvas.width * 4;
  for (let stepY = 0; stepY < stepYLimit; stepY += canvas.width * scaleY * 4) {
    for (let stepX = stepY; stepX < stepY + canvas.width * 4; stepX += scaleX * 4) {
      imageData.push(`rgba(${bigImageData[stepX + 0]},${bigImageData[stepX + 1]},${bigImageData[stepX + 2]},${(bigImageData[stepX + 3] / 255)})`);
    }
  }
  return imageData;
}

function fillPixel(imageData, x, y, targetColor, fillColor) {
  const fillPixelImageData = imageData;
  const currentPixelColor = getPixel(fillPixelImageData, x, y);
  if (colorsMatch(currentPixelColor, targetColor)) {
    setPixel(fillPixelImageData, x, y, fillColor);
    fillPixel(fillPixelImageData, x + scaleX, y, targetColor, fillColor);
    fillPixel(fillPixelImageData, x - scaleX, y, targetColor, fillColor);
    fillPixel(fillPixelImageData, x, y + scaleY, targetColor, fillColor);
    fillPixel(fillPixelImageData, x, y - scaleY, targetColor, fillColor);
  }
  return fillPixelImageData;
}

function floodFill(x, y, fillColor) {
  let imageData = imageConverter();
  const targetColor = getPixel(imageData, x, y);
  if (!colorsMatch(targetColor, fillColor)) {
    imageData = fillPixel(imageData, x, y, targetColor, fillColor);
  }

  const finalImageData = [];
  const cutImageData = imageData;
  while (cutImageData.length > 0) {
    finalImageData.push(cutImageData.splice(0, 4));
  }
  fillCanvas(finalImageData);
}


// Handle mouse events

canvas.addEventListener('mousedown', (e) => {
  switch (selectedTool) {
    case 'pencil':
      isDrawing = true;
      pencilDraw(e);
      break;
    case 'paint-bucket':
      floodFill(e.offsetX, e.offsetY, selectedColor);
      break;
    case 'color-picker':
      pickColor(e);
      break;
    default:
      break;
  }
});

canvas.addEventListener('mousemove', pencilDraw);
document.addEventListener('mouseup', () => { isDrawing = false; });

// Handle keyboad events

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyP' || e.code === 'KeyC' || e.code === 'KeyB') {
    for (let k = 0; k < tool.length; k += 1) {
      tool[k].removeAttribute('checked');
    }

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
});

// Save data to lacel storage

document.addEventListener('click', () => {
  localStorage.setItem('canvas', imageConverter());
  localStorage.setItem('tool', selectedTool);
  localStorage.setItem('color', selectedColor);
});
