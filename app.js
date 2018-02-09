"use strict";

let a = 1.5;
let b = 1.2;
let c = 2.1;
let d = 1.8;

let step = 0.01;
let time = 100;

let prey0 = 10;
let predator0 = 5;

let prey = prey0;
let predator = predator0;

let preyArr = [];
let predatorArr = [];
let phaseArr = [];

function preyEq(x, y) {
  return x * (a - b * y);
}

function predatorEq(x, y) {
  return -y * (c - d * x);
}

for (let i = 0; i < time; i += step) {
  preyArr.push({x: i, y: prey0})
  predatorArr.push({x: i, y: predator0})
  if (predator0 > 0.5){
    phaseArr.push({x: prey0, y: predator0})
  }

  prey0 = prey;
  predator0 = predator;

  prey += step * preyEq(prey0, predator0);
  predator += step * predatorEq(prey0, predator0);
}

let ppctx = document.getElementById("ppChart").getContext('2d');
let ppChart = new Chart(ppctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Prey',
        data: simplify(preyArr,0.25),
        borderColor: "green"
      }, {
        label: 'Predator',
        data: simplify(predatorArr,0.25),
        borderColor: "red"
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom'
        }
      ]
    },
    elements: {
      line: {
        tension: 0
      }
    },
    downsample: {
      enabled: true,
      threshold: 1000,
      auto: false,
      onInit: true,
      preferOriginalData: true,
      restoreOriginalData: false,
    }
  }
});

let phasectx = document.getElementById("phaseChart").getContext('2d');
let phaseChart = new Chart(phasectx, {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Phase Chart',
        data: phaseArr
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom'
        }
      ]
    }
  }
});
