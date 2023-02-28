const svg = require("@svgdotjs/svg.js");
import { drawTerrain1 } from "./terrain/terrain-1";
import { drawterrain2 } from "./terrain/terrain-2";
import { drawterrain3 } from "./terrain/terrain-3";
import { drawPolar, meshGrid } from "./other/symmetry";
import { init } from "./grid/grid-P1";
import { createSineWaveWithTrees, createSineWaveWithTreesRandomSeed } from "./gradual/svggen/SineGen";
// import { init } from "./grid/grid-P2";

//add layer pen to svg
id = "#svg1";
var svgObj = svg.SVG().addTo(id).viewbox(0, 0, 1000, 500).attr({ overflow: "hidden" });
// drawTerrain1(svgObj);
// drawterrain2(svgObj);
// drawterrain3(svgObj);
// drawPolar(id);
// meshGrid();
// init();
createSineWaveWithTreesRandomSeed("TEST");
