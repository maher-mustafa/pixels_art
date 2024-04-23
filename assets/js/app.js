const canvas = document.querySelector(".canvas");
const color = document.querySelector("#colorPicker");
const clear_btn = document.querySelector("#clear");
const show_btn = document.querySelector("#show");
const guid = document.querySelector("#guid");
const drawingContext= canvas.getContext("2d");
let isDrawing = false;

let NUMBER_OF_CELLS=20; // Number of cells in each dimension (square)
let CELL_SIZE = canvas.width / NUMBER_OF_CELLS;
let colorHistory = {};
// set defult color
color.value = "#009578"
// set convas bg color

drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height); 

function handleCanvasMouseDown(e) {
    if (e.button !== 0) {
        return
    }
    const mousePos = canvas.getBoundingClientRect(e);
    let x = Math.floor((e.clientX - mousePos.left)/CELL_SIZE);
    let y = Math.floor((e.clientY - mousePos.top) / CELL_SIZE);
    let currentColor = colorHistory[`${x}-${y}`];
   
    if (e.ctrlKey) {
      if (currentColor) {
        color.value = currentColor;
      }
    } else {
      drawCellAtPosition(x, y);
    }
}
function handleClearButton() {
    const yes = confirm('Are you sure that you want to clear your canvas?');
    if (!yes) return;
    else {
        drawingContext.fillStyle = "#ffffff";
        drawingContext.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}
function handleShowButton() {
    if(show_btn.checked){
        guid.style.display="grid";
    }
    else{
        guid.style.display="none";
    }

}
function drawCellAtPosition(x, y) {
    let startX = x * CELL_SIZE;
    let startY = y * CELL_SIZE;
    drawingContext.fillStyle = color.value;
    drawingContext.fillRect(startX,startY,CELL_SIZE,CELL_SIZE)
    colorHistory[`${x}-${y}`]=color.value;
  
}

function grid() {
    guid.style.cssText = `
    height: ${canvas.height}px;
    width: ${canvas.width}px;
    grid-template-columns: repeat(${NUMBER_OF_CELLS},1fr);
    grid-template-rows: repeat(${NUMBER_OF_CELLS}, 1fr);`;
    for (var i = 0; i < NUMBER_OF_CELLS*NUMBER_OF_CELLS; i++){
        let cell = document.createElement("div");
         guid.append(cell);
    }
    // guid.appendChild(cell)
}
grid();

canvas.addEventListener("mousedown", handleCanvasMouseDown);
clear_btn.addEventListener("click", handleClearButton);
show_btn.addEventListener("change", handleShowButton);