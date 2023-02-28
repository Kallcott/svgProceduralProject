const svg = require("@svgdotjs/svg.js");
const Color = require("color");
const filter = require("@svgdotjs/svg.filter.js");

const baseColor = Color("#457cd6");
// var displacement = new DisplacementMapEffect({in1: , in2: , scale: , })

function drawPolar(id) {
  var size = 12;
  var height = size;
  var width = size;

  var svgObj = svg.SVG().addTo(id).viewbox(0, 0, width, height).css("transform-Box", "fill-box").filter();

  svgObj.rect(6, 6).fill(baseColor);
}

/// Polar Coords
// x - (witdth / 1);
// y - (height / 2);

//distance from center
// var d = Math.sqrt( ( adjusted_x * adjusted_x ) + ( adjusted_y * adjusted_y ) );

// Angle
// var angle = Math.atan2( adjusted_y, adjusted_x );

// angle in degres
// var angle_in_degrees = ( Math.atan2( adjusted_y, adjusted_x ) + ( Math.PI / 2 ) ) * ( 360 / ( Math.PI * 2 ) );

// Use a matrix transform??

// Code to create image
// https://stackoverflow.com/questions/34695166/convert-an-image-from-cartesian-to-polar

// Map pixel value at (1,1) to it's polar equivalent:
// [r, theta] = cart2pol(1 - floor(r/2), 1- floor(c/2))

// find center of image
// [r,c] = size(image);
// r = floor(r / 2);
// c = floor(c / 2);

// Mesh Grid
function meshGrid() {
  var quadsAcross = 200;
  var quadsDown = 200;
  for (var y = 0; y <= quadsDown; ++y) {
    var v = y / quadsDown;
    for (var x = 0; x <= quadsAcross; ++x) {
      var u = x / quadsAcross;
      positions.push(u, v);
      uvs.push(u, v);
    }
  }

  var rowSize = quadsAcross + 1;
  for (var y = 0; y < quadsDown; ++y) {
    var rowOffset0 = (y + 0) * rowSize;
    var rowOffset1 = (y + 1) * rowSize;
    for (var x = 0; x < quadsAcross; ++x) {
      var offset0 = rowOffset0 + x;
      var offset1 = rowOffset1 + x;
      indices.push(offset0, offset0 + 1, offset1);
      indices.push(offset1, offset0 + 1, offset1 + 1);
    }
  }

  console.log(indices);
}

module.exports = {
  drawPolar,
  meshGrid,
};
