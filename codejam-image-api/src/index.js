import { data, cities } from './utils/static-data';
import Canvas from './utils/class-canvas';
import unsplashUrl from './utils/image-api';
import SearchBar from './utils/search-bar';

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

// Set search town component

const mySearchBar = new SearchBar();
mySearchBar.init();
const domSearchBar = document.querySelector('#searchbar');
domSearchBar.addEventListener('keyup', () => mySearchBar.filterCities(cities));

const domLoadBtn = document.querySelector('#load-btn');
domLoadBtn.addEventListener('click', async () => {
    const myUrl = await unsplashUrl(mySearchBar.cityInput);
    myCanvas.drawImageOnCanvas(myUrl);
});


// Covert image to B&W

const domBWBtn = document.querySelector('#bw-btn');
domBWBtn.addEventListener('click', () => {
    myCanvas.toGrayScale();
});
