"use strict";

let a; // the rate of growth
let b; // the rate of predation
let c; // predator growth rate
let d; // the natural death rate
let step = 0.01; // each step for the Euler step method
let time; // total steps

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
  let phaseArr = [];

  for (let i = 0; i < time; i += step) {
    preyArr.push({x: i, y: prey0})
    predatorArr.push({x: i, y: predator0})
    if (predator0 > 0.5 && prey0 > 0.5) {
      phaseArr.push({x: prey0, y: predator0})
    }

    prey0 = prey;
    predator0 = predator;
    if (prey + step * preyEq(prey0, predator0) < 0){
      prey = 0;
    }
    else{
      prey += step * preyEq(prey0, predator0);
    }
    if (predator + step * predatorEq(prey0, predator0) < 0){
      predator = 0;
    }
    else{
      predator += step * predatorEq(prey0, predator0);
    }
  }
  return [preyArr, predatorArr, phaseArr]
}

let ppctx = document.getElementById("ppChart").getContext('2d');
let ppChart = new Chart(ppctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Population of Prey',
        data: [
          {
            'x': 0,
            'y': 0
          }
        ],
        borderColor: "green"
      }, {
        label: 'Population of Predators',
        data: [
          {
            'x': 0,
            'y': 0
          }
        ],
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
          scaleLabel: {
            display: true,
            labelString: "Time Passed (units)"
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: "Population"
          }
        }
      ]
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
        data: [
          {
            'x': 0,
            'y': 0
          }
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: "Population of Prey"
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: "Population of Predators"
          }
        }
      ]
    }
  }
});

function updateCharts(s, t) {
  s = Number(s)
  t = Number(t)
  let setupTemp = doEuler(s, t)
  let preyArrTemp = setupTemp[0]
  let predatorArrTemp = setupTemp[1]
  let phaseArrTemp = setupTemp[2]
  let preyArrTempS = simplify(preyArrTemp, 0.20, true);
  let predatorArrTempS = simplify(predatorArrTemp, 0.20, true);

  ppChart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });

  ppChart.data.datasets[0].data = preyArrTempS;
  ppChart.data.datasets[1].data = predatorArrTempS;
  phaseChart.data.datasets[0].data = phaseArrTemp;
  ppChart.update();
  phaseChart.update();
}

let preyNumberSlider = document.getElementById('prey-number-slider');
let predatorNumberSlider = document.getElementById('predator-number-slider');
let preyGrowthSlider = document.getElementById('prey-growth-slider');
let preyPredationSlider = document.getElementById('prey-predation-slider');
let predatorGrowthSlider = document.getElementById('predator-growth-slider');
let predatorDeathSlider = document.getElementById('predator-death-slider');
let eulerStepSlider = document.getElementById('euler-step-slider');
let eulerTotalSlider = document.getElementById('euler-total-slider');

let preyNumberValue = document.getElementById('prey-number-value');
let predatorNumberValue = document.getElementById('predator-number-value');
let preyGrowthValue = document.getElementById('prey-growth-value');
let preyPredationValue = document.getElementById('prey-predation-value');
let predatorGrowthValue = document.getElementById('predator-growth-value');
let predatorDeathValue = document.getElementById('predator-death-value');
let eulerStepValue = document.getElementById('euler-step-value');
let eulerTotalValue = document.getElementById('euler-total-value');

noUiSlider.create(preyNumberSlider, {
  start: 10,
  step: 1,
  range: {
    'min': 1,
    'max': 50
  }
});

noUiSlider.create(predatorNumberSlider, {
  start: 5,
  step: 1,
  range: {
    'min': 1,
    'max': 50
  }
});

noUiSlider.create(preyGrowthSlider, {
  start: 3,
  range: {
    'min': 0.01,
    'max': 5
  }
});

noUiSlider.create(preyPredationSlider, {
  start: 1.2,
  range: {
    'min': 0.01,
    'max': 5
  }
});

noUiSlider.create(predatorGrowthSlider, {
  start: 0.8,
  range: {
    'min': 0.01,
    'max': 5
  }
});

noUiSlider.create(predatorDeathSlider, {
  start: 0.5,
  range: {
    'min': 0.01,
    'max': 5
  }
});
/*
noUiSlider.create(eulerStepSlider, {
	start: 0.005,
	range: {
		'min': 0.001,
		'max': 0.01
	}
});
*/
noUiSlider.create(eulerTotalSlider, {
  start: 100,
  step: 1,
  range: {
    'min': 1,
    'max': 350
  }
});

preyNumberSlider.noUiSlider.on('update', function(value) {
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  preyNumberValue.innerHTML = value;
});

predatorNumberSlider.noUiSlider.on('update', function(value) {
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  predatorNumberValue.innerHTML = value;
});

preyGrowthSlider.noUiSlider.on('update', function(value) {
  a = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  preyGrowthValue.innerHTML = value;
});

preyPredationSlider.noUiSlider.on('update', function(value) {
  b = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  preyPredationValue.innerHTML = value;
});

predatorGrowthSlider.noUiSlider.on('update', function(value) {
  c = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  predatorGrowthValue.innerHTML = value;
});

predatorDeathSlider.noUiSlider.on('update', function(value) {
  d = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  predatorDeathValue.innerHTML = value;
});
/*
eulerStepSlider.noUiSlider.on('update', function(value) {
  step = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(),predatorNumberSlider.noUiSlider.get())
  eulerStepValue.innerHTML = value;
});
*/
eulerTotalSlider.noUiSlider.on('update', function(value) {
  time = Number(value[0])
  updateCharts(preyNumberSlider.noUiSlider.get(), predatorNumberSlider.noUiSlider.get())
  eulerTotalValue.innerHTML = value;
});

function reset(){
  preyGrowthSlider.noUiSlider.set(3);
  preyPredationSlider.noUiSlider.set(1.2);
  predatorGrowthSlider.noUiSlider.set(0.8);
  predatorDeathSlider.noUiSlider.set(0.5);
  step = 0.01;
  eulerTotalSlider.noUiSlider.set(100);
  preyNumberSlider.noUiSlider.set(10)
  predatorNumberSlider.noUiSlider.set(5)
}

document.getElementById('reset').addEventListener('click',reset, false);
