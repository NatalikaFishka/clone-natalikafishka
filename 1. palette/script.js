const data1 = [
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
];


const canvas_4x4 = document.querySelector('#canvas_4x4');

const ctx1 = canvas_4x4.getContext("2d");

let width1 = data1[0].length;
let height1 = data1.length;
let scaleX1 = canvas_4x4.width / width1;
let scaleY1 = canvas_4x4.height / height1;

for (let row = 0; row < height1; row++) {
    for (let col = 0; col < width1; col++) {
        ctx1.fillStyle = data1[row][col];
        ctx1.fillRect(col * scaleX1, row * scaleY1, scaleX1, scaleY1);
    }
}