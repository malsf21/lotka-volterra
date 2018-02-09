"use strict";

let a = 1.5;
let b = 1.2;
let c = 2.1;
let d = 1.8;

let step = 0.01;
let time = 50;

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
        yAxisID: 'prey-y-axis',
        data: simplify(preyArr,0.20),
        borderColor: "green"
      }, {
        label: 'Predator',
        yAxisID: 'predator-y-axis',
        data: simplify(predatorArr,0.20),
        borderColor: "red"
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          scaleLabel:{
            display: true,
            labelString: "Time Passed (units)"
          }
        }
      ],
      yAxes: [{
                id: 'prey-y-axis',
                type: 'linear',
                position: 'left',
                scaleLabel:{
                  display: true,
                  labelString: "# of Prey"
                }
            }, {
                id: 'predator-y-axis',
                type: 'linear',
                position: 'right',
                scaleLabel:{
                  display: true,
                  labelString: "# of Predators"
                }
            }]
    },
    elements: {
      line: {
        tension: 0
      }
    }
  }
});

let phasectx = document.getElementById("phaseChart").getContext('2d');
let phaseChart = new Chart(phasectx, {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Prey vs. Predator',
        data: phaseArr
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          scaleLabel:{
            display: true,
            labelString: "# of Prey"
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          scaleLabel:{
            display: true,
            labelString: "# of Predators"
          }
        }
      ]
    }
  }
});
