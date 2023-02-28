import { SVG } from "@svgdotjs/svg.js";
import Color from "color";

function drawterrain2(svg) {
  const layerHeight = 190;
  const offsetY = 300;
  const layerWidth = document.documentElement.clientWidth;
  const layerTotal = 5;

  const baseColor = Color("#457cd6");

  let svgsRes = [];

  let amplitude;
  let currLayer;
  let currPoint;
  let layerAnchorY;
  let coord;

  let freq1;
  let phase1;
  let freq2;
  let phase2;

  let detail = 1; // quality of limage

  //add layers
  currLayer;
  for (currLayer = 1; currLayer <= layerTotal; currLayer++) {
    addLayer().next().value;
  }

  function* addLayer() {
    try {
      while (true) {
        layerAnchorY = currLayer * (layerHeight / layerTotal) + offsetY;

        // Set sine wave properties
        amplitude = Math.random() * (layerHeight / layerTotal) + layerHeight / currLayer / layerTotal; // height of curves
        freq1 = (Math.random() * 0.02 * currLayer) / layerTotal + 0.005; // distance between peaks
        freq2 = Math.random() * 0.01 + 0.005;
        phase1 = Math.random() * 500; // move the curve left / right
        phase2 = phase1 + (Math.random() + 250);

        console.log(currLayer);
        console.log(amplitude);
        console.log(layerAnchorY);

        // Set initial pen coordinate
        let coord = `M 0 ${layerAnchorY} `;

        for (currPoint = 1; currPoint <= layerWidth + 1; currPoint += detail) {
          coord += addWave().next().value;
        }
        //complete shape for fill
        coord += `V ${layerAnchorY} L 0 ${layerAnchorY}`;

        // Add path and color
        svg.path(coord).fill(
          `${baseColor
            .saturate(currLayer / layerTotal / 2.5)
            .darken(currLayer / layerTotal)
            .string()}`
        );

        yield;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function* addWave() {
    try {
      let v = 0;
      while (true) {
        // console.log(currPoint);

        v =
          Math.sin(freq1 * (currPoint + phase1)) * amplitude + //base curve
          (Math.sin(freq2 * (currPoint + phase2)) * amplitude) / 2 + // interfering curve
          layerAnchorY -
          layerHeight;

        console.log("V " + v);

        let interprolatedPoint = `H ${currPoint} V ${v}`;

        yield interprolatedPoint;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  drawterrain2,
};
