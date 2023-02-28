const svg = require("@svgdotjs/svg.js");
// import "seedrandom";
var seedrandom = require("seedrandom");
// var path = require("svg.path.js");
// import "svg.path.js";

function createSineWaveWithTreesRandomSeed(seed) {
  // Generate a seeded random number generator
  var rng = seedrandom(seed);

  // Generate random values for the parameters of the function
  var width = 800;
  var height = 400;
  var amplitude = rng() * 100 + 50;
  var treeWidth = rng() * 30 + 10;
  var treeHeight = rng() * 100 + 50;
  var treeSpacing = rng() * 50 + 50;
  var turbulenceFrequency = rng() * 0.2 + 0.01;
  var turbulenceStrength = rng() * 100 + 50;

  // Create the SVG
  createSineWaveWithTrees(width, height, amplitude, treeWidth, treeHeight, treeSpacing, turbulenceFrequency, turbulenceStrength);
}

function createSineWaveWithTrees(width, height, amplitude, treeWidth, treeHeight, treeSpacing, turbulenceFrequency, turbulenceStrength) {
  // Create an SVG.js instance and add it to the DOM
  var draw = svg.SVG().addTo("body").size(width, height);

  // Define the path of the sine wave using S command
  var path = draw.path().fill("none").stroke({ width: 2, color: "black" });
  var x = 0;
  var y = height / 2;
  for (var i = 0; i <= Math.ceil(width / 100); i++) {
    path.M(x, y);
    path.S(x + 50, y - amplitude, x + 100, y);
    x += 100;
    y = height / 2 + Math.round(Math.sin((x / 100) * Math.PI) * amplitude);
  }

  // Create the turbulence filter
  var turbulence = draw
    .defs()
    .filter()
    .feTurbulence("fractalNoise", turbulenceFrequency, turbulenceStrength, 4)
    .feDisplacementMap("SourceGraphic", "R", "R", 50);

  // Apply the filter to the path
  path.filter(turbulence);

  // Create the gradient fill
  var gradient = draw.gradient("linear", function (stop) {
    stop.at(0, "white");
    stop.at(1, "blue");
  });

  // Define the path of the gradient using the S command
  // Edit this to be more effifient, no need to duplicate sine wave
  var gradientPath = draw
    .path()
    .d("M0," + height + "L0," + height / 2 + path.toString() + "L" + width + "," + height / 2 + "L" + width + "," + height + "Z")
    .fill(gradient);

  // Add trees along the path
  // Generalise this to insert any elemmt
  // Specific path lenth
  var pathLength = path.length();
  for (var i = 0; i < pathLength; i += treeSpacing) {
    var point = path.pointAt(i);
    var tree = draw.group();
    var trunk = tree.rect(treeWidth / 3, treeHeight).fill("brown");
    var foliage = tree.circle(treeWidth).fill("green");
    tree.move(point.x - treeWidth / 2, point.y - treeHeight);
  }
}

module.exports = {
  createSineWaveWithTrees,
  createSineWaveWithTreesRandomSeed,
};
