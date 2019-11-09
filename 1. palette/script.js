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
        ctx.fillRect(col * scaleX, row * scaleY, scaleX, scaleY);
    }
}

let selectedTool;
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

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function pencilDraw(e) {
    if (selectedTool === "pencil") {
        if (!isDrawing) return;
        let x = Math.floor(e.offsetX / scaleX);
        let y = Math.floor(e.offsetY / scaleY);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
    }
}

canvas_4x4.addEventListener('mousedown', (e) => {
    isDrawing = true;
    pencilDraw(e);
});
canvas_4x4.addEventListener('mousemove', pencilDraw);
document.addEventListener('mouseup', () => isDrawing = false);




let tool = document.querySelectorAll('.tool');
selectedTools(tool);