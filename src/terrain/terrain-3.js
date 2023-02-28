import { SVG } from "@svgdotjs/svg.js";
import Color from "color";
import { SVGfilter } from "@svgdotjs/svg.filter.js";

function drawterrain3(svg) {
  const layerHeight = 190;
  const offsetY = 400;
  const layerWidth = document.documentElement.clientWidth;
  const layerTotal = 5;

  const baseColor = Color("#457cd6").rotate(320).desaturate(0.1).darken(0.3);

  let amplitude;
  let currLayer;
  let currPoint;
  let layerAnchorY;

  let sunX = Math.random() * 0.5 + 0.25;
  let sunY = Math.random() * 0.1 + 0.1;
  let sunPosX = sunX * (layerWidth / 2);
  let sunPosY = sunY * 300 + 75;

  let freq1;
  let phase1;
  let freq2;
  let phase2;

  let detail = 1; // quality of limage

  // Background
  svg
    .rect()
    .attr({ x: "0", y: "0", width: "100%", height: "100%" })
    .fill("url('#fillbg')")
    .filterWith(function (add) {
      // Noise
      var filter = add.turbulence({ baseFrequency: 0.6, type: "fractalNoise" });
      add.colorMatrix("saturate", 0);
      add.blend(add.$source, filter, "multiply");
    });

  // The Sun
  svg
    .circle()
    .attr({ cx: `${sunPosX}`, cy: `${sunPosY}`, r: "20" })
    .fill(`${baseColor.rotate(180).desaturate(0.8).lighten(0.8).string()}`);

  // Above this is Background
  //add layers
  currLayer;
  for (currLayer = 1; currLayer <= layerTotal; currLayer++) {
    addLayer().next().value;
  }
  // Below this is Forground

  // background gradient
  svg
    .root()
    .defs()
    .gradient("radial", function (add) {
      add.stop({ opacity: "0%", color: baseColor.rotate(240).desaturate(1).lighten(1).string() });
      add.stop({ opacity: "5%", color: baseColor.rotate(240).lighten(0.7).string() });
      add.stop({ opacity: "20%", color: baseColor.rotate(120).desaturate(0.5).lighten(0.4).string() });
      add.stop({ opacity: "60%", color: baseColor.rotate(0).desaturate(0.5).lighten(0.2).string() });
      add.stop({ opacity: "90%", color: baseColor.rotate(0).desaturate(0.5).darken(0.1).string() });
      add.stop({ opacity: "100%", color: baseColor.rotate(0).desaturate(0.5).darken(0.2).string() });
    })
    .attr({ id: `fillbg`, cx: `${sunX}`, cy: `${sunY}` });

  // Fog Gradient
  svg
    .root()
    .defs()
    .gradient("linear", function (add) {
      add.stop({ offset: "0%", color: "rgb(255,255,255)", opacity: 1 - sunY * 3.3 });
      add.stop({ offset: "100%", color: "rgb(255,255,255)", opacity: 0 });
    })
    .attr({ id: `fog`, x1: "0%", y1: "0%", x2: "0%", y2: "100%" });

  // Fog Applier
  svg.rect().attr({ x: "0", y: "0", width: "100%", height: "100%" }).fill("url('#fog')");

  /**
   *
   */
  function* addLayer() {
    try {
      while (true) {
        // added random variance for a hilly effect
        layerAnchorY = currLayer * (layerHeight / layerTotal) + offsetY + Math.random() * (layerHeight / layerTotal);

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

        // add light from sun
        svg
          .root()
          .defs()
          .gradient("radial", function (add) {
            add.stop({
              offset: "0%",
              color: `${baseColor
                .rotate(90)
                .saturate(0.1)
                .lighten(0.6)
                .desaturate(0.1 * currLayer)
                .darken(0.1 * currLayer)
                .string()}`,
            });
            add.stop({
              offset: `${20 / currLayer}%`,
              color: `${baseColor
                .rotate(70)
                .saturate(0.3)
                .desaturate(currLayer / layerTotal / 4)
                .darken(currLayer / layerTotal / 2)
                .rotate(120 - 45 * (currLayer / layerTotal))
                .string()}`,
            });
            add.stop({
              offset: "100%",
              color: `${baseColor
                .rotate()
                .saturate(currLayer / layerTotal / 4)
                .darken(currLayer / layerTotal)
                .string()}`,
            });
          })
          .attr({ id: `fill${currLayer}`, cx: sunX / 2, cy: sunY / 2 - (currLayer - 1) / Math.pow(layerTotal, 2) });

        // Add path and color
        svg.path(coord).fill(`url('#fill${currLayer}')`); // end of loop

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

        trees =
          (Math.sin((currPoint * currLayer) / 5) * Math.log(currLayer)) / 4 + // detail
          (Math.sin((currPoint * currLayer) / 3) * Math.log(currLayer * 2, 10)) / 2 + // detail
          Math.sin((currPoint * currLayer) / 2) * (Math.log(currLayer, 2) * 1.5); // more detailMath.sni
        console.log("V " + v);

        let interprolatedPoint = `H ${currPoint} V ${v + trees}`;

        yield interprolatedPoint;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  drawterrain3,
};
