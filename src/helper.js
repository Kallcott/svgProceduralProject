// Generator Function
function randomFrom(...arr) {
  try {
    while (true) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  } catch (e) {
    alert(e);
  }
}

function randomBetween(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

/**
 * Ease In, userd as amt in lerp
 * Gradual slope initially before straightening out
 * @param {*} t time / duration
 * @returns
 */
function easeIn(t) {
  return t * t;
}

/**
 * Ease Out, used as amt in lerp
 * Initially straight before gradual sloping nearing the target
 * @param {*} t time / duration
 * @returns
 */
function easeOut(t) {
  return flip(Math.sqrt(flip(t)));
}

/**
 * Flip
 * Inverts the position
 * @param {*} x
 * @returns
 */
function flip(x) {
  return 1 - x;
}

/**
 * Spike
 * Highes slope in center of lerp.
 * @param {*} t transformation
 */
function spike(t) {
  if (t <= 0.5) {
    return easeIn(t / 0.5);
  }
  return easeIn(flip(t) / 0.5);
}

/**
 * Linear interprolation
 * @param {*} start the start value
 * @param {*} end the end value
 * @param {*} unitInterval percentage of completion [0-1]
 * @returns
 */
function lerp(start, end, unitInterval) {
  return (1 - unitInterval) * start + unitInterval * end;
}

/**
 * lerp for a 3 dimension object. Colors, or space
 * @param {*} vector3 a array of length 3
 * @param {*} x2 target value at 1
 * @param {*} y2 target value a 1
 * @param {*} z2 target value on 1
 * @param {*} unitInterval percentage of complettion [0-1]
 * @returns
 */
function lerp3(vector3, x2, y2, z2, unitInterval) {
  xLerp = lerp(vector3[0], x2, unitInterval);
  yLerp = lerp(vector3[1], y2, unitInterval);
  zLerp = lerp(vector3[2], z2, unitInterval);
  return [xLerp, yLerp, zLerp];
}

// Color is too big brain I'm done
// class Color {
//   constructor(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
//   }

//   get r() {
//     return this.r;
//   }
//   get g() {
//     return this.g;
//   }
//   get b() {
//     return this.b;
//   }

//   lerp(r, g, b, unitInterval) {
//     rLerp = lerp(this.r, r, unitInterval);
//     gLerp = lerp(this.g, g, unitInterval);
//     bLerp = lerp(this.b, b, unitInterval);
//   }

//   rgb(r, g, b) {
//     return `rgb(${r},${g}.${b})`;
//   }

//   rgbToHsl(R, G, B){
//     //R, G and B input range = 0 ÷ 255
//     //H, S and L output range = 0 ÷ 1.0

//     var_R = ( R / 255 )
//     var_G = ( G / 255 )
//     var_B = ( B / 255 )

//     var_Min = min( var_R, var_G, var_B )    //Min. value of RGB
//     var_Max = max( var_R, var_G, var_B )    //Max. value of RGB
//     del_Max = var_Max - var_Min             //Delta RGB value

//     L = ( var_Max + var_Min )/ 2

//     if ( del_Max == 0 )                     //This is a gray, no chroma...
//     {
//         H = 0
//         S = 0
//     }
//     else                                    //Chromatic data...
//     {
//       if ( L < 0.5 ) S = del_Max / ( var_Max + var_Min )
//       else           S = del_Max / ( 2 - var_Max - var_Min )

//       del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max
//       del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max
//       del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max

//       if      ( var_R == var_Max ) H = del_B - del_G
//       else if ( var_G == var_Max ) H = ( 1 / 3 ) + del_R - del_B
//       else if ( var_B == var_Max ) H = ( 2 / 3 ) + del_G - del_R

//         if ( H < 0 ) H += 1
//         if ( H > 1 ) H -= 1
//     }
//     return;
//   }
// }

//converts a number into 1 and 0
function normalize(val, max, min) {
  return (val - min) / (max - min);
}

module.exports = {
  randomFrom,
  randomBetween,
  easeIn,
  easeOut,
  flip,
  spike,
  lerp,
};
