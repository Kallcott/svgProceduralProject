const svg = require("@svgdotjs/svg.js");

export function drawTerrain1(svg) {
  const layerHeight = 300;
  const layerWidth = window.innerWidth;

  let amplitude = Math.random() * (layerHeight / 2); // height of curves
  let freq1 = Math.random() * 0.02 * +0.005; // distance between peaks
  let phase1 = Math.random() * 250; // move the curve left / right

  let freq2 = Math.random() * 0.01 + 0.005;
  let phase2 = phase1 + (Math.random() + 175);

  // quality of limage
  let detail = 2;

  // Set initial pen coordinate
  let coord = `M 0 ${layerHeight} `;

  let currPoint = 1;
  for (currPoint = 0; currPoint <= layerWidth; currPoint += detail) {
    coord += addWave().next().value;
  }
  //complete shape for fill
  coord += `V ${layerHeight} L 0 ${layerHeight}`;

  //Add shape to path
  svg.path(coord).stroke({ color: `#000`, opacity: 0.6, width: 5 });

  function* addWave() {
    try {
      while (true) {
        // console.log(currPoint);
        let interprolatedPoint = `H ${currPoint} V ${
          Math.sin(freq1 * (currPoint + phase1)) * amplitude + //base curve
          (Math.sin(freq2 * (currPoint + phase2)) * amplitude) / 2 + // interfering curve
          layerHeight / 2 // offset by max height
        }`;

        yield interprolatedPoint;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  drawTerrain1,
};
