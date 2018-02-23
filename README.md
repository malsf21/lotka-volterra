# lotka-volterra
m a t h e x p l o r a t i o n

I'll document more once I have time.

Simple version of Euler Step Method used here:

```javascript

"use strict";

let a; // the rate of growth
let b; // the rate of predation
let c; // predator growth rate
let d; // the natural death rate
let step = 0.01; // each step for the Euler step method
let time; // time units passed

function preyEq(x, y) {
  return x * (a - (b * y));
}

function predatorEq(x, y) {
  return -y * (c - (d * x));
}

function doEuler(prey0, predator0) {
  let prey = prey0;
  let predator = predator0;
  let preyArr = [];
  let predatorArr = [];

  for (let i = 0; i < time; i += step) {
    preyArr.push({x: i/step, y: prey0})
    predatorArr.push({x: i/step, y: predator0})

    prey0 = prey;
    predator0 = predator;

    prey += step * preyEq(prey0, predator0);
    predator += step * predatorEq(prey0, predator0);
  }
  return [preyArr, predatorArr]
}

```
