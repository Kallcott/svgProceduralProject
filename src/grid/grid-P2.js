import { SVG } from "@svgdotjs/svg.js";
import Color from "color";
import { random, randomBetween, randomFrom } from "../helper";

let draw, squareSize, numRows, numCols, colors, colorPalette;

/*
Block Design Functions
*/

function drawBlock(x, y, background) {
  // Create group element
  const group = draw.group().addClass("draw-box");

  // Draw Block
  group.rect(squareSize, squareSize).fill(background).move(x, y);
}

/*
Create New Piece
*/

function generateNewGrid() {
  // Remove SVG
  document.querySelector(".container").innerHTML = "";
  drawGrid();
}

async function drawGrid() {
  // Set Random Palette
  colorPalette = randomBetween(0, colors.size);
  // console.log(colorPalette);
  console.log(colors.size);

  // Set Variables
  squareSize = 100;
  numRows = randomBetween(4, 8);
  numCols = randomBetween(4, 8);

  // Create parent SVG
  draw = SVG()
    .addTo(".container")
    .size("100%", "100%")
    .viewbox(`0 0 ${numRows * squareSize} ${numCols * squareSize}`);

  // Create Grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      generateLittleBlock(i, j);
    }
  }
}

function generateLittleBlock(i, j) {
  const xPos = i * squareSize;
  const yPos = j * squareSize;

  const background = randomFrom(colorPalette);
  // console.log(colorPalette);

  drawBlock(xPos, yPos, background);
}

async function init() {
  // Get color palettes
  colors = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());

  generateNewGrid();
  document.querySelector(".button").addEventListener("click", generateNewGrid);
}

init();

module.exports = {
  init,
};
