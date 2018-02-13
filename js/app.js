"use strict";

let a = 3; // the rate of growth
let b = 1.2; // the rate of predation
let c = 0.8; // predator growth rate
let d = 0.5; // the natural death rate

let step = 0.01; // each step for the Euler step method
let time = 50; // total steps

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
  if (predator0 > 0.5 && prey0 > 0.5){
    phaseArr.push({x: prey0, y: predator0})
  }

  prey0 = prey;
  predator0 = predator;

  prey += step * preyEq(prey0, predator0);
  predator += step * predatorEq(prey0, predator0);
}

//let preyArrS = preyArr;
//let predatorArrS = predatorArr;

let preyArrS = simplify(preyArr,0.20, true);
let predatorArrS = simplify(predatorArr,0.20, true);

let ppctx = document.getElementById("ppChart").getContext('2d');
let ppChart = new Chart(ppctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Prey',
        yAxisID: 'prey-y-axis',
        data: preyArrS,
        borderColor: "green"
      }, {
        label: 'Predator',
        yAxisID: 'predator-y-axis',
        data: predatorArrS,
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
