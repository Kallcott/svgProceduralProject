import { SVG } from "@svgdotjs/svg.js";
import { randomBetween } from "../helper";

let draw, squareSize, numRows, numCols;

async function drawGrid() {
  // Set  inputs
  numRows = randomBetween(4, 8);
  numCols = randomBetween(4, 8);
  console.log("Cols: " + numCols + "-- Rows: " + numRows);
  squareSize = 100;

  // Create parent svg
  draw = SVG()
    .attr("overflow", "auto")
    .addTo(".container") // add to class / id
    .size("100%", "100%")
    .viewbox(`0 0 ${numRows * squareSize} ${numCols * squareSize}`);

  // Row Col Generation
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      generateLittleBlock(i, j);
    }
  }

  // More to be added
  function generateLittleBlock(i, j) {
    const xPos = i * squareSize;
    const yPos = j * squareSize;

    drawBlock(xPos, yPos);
  }

  function drawBlock(x, y) {
    // Creating a group (container)
    const group = draw.group().addClass("draw-block");

    //draw Square
    group.rect(squareSize, squareSize).fill("white").stroke("black").move(x, y);
  }
}

function generateNewGrid() {
  // Remove SVG
  document.querySelector(".container").innerHTML = "";
  drawGrid();
}

async function init() {
  generateNewGrid();
  document.querySelector(".button").addEventListener("click", generateNewGrid);
}

module.exports = {
  init,
};
