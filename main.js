
'use strict';

let presetSeconds = 120;
let totalSeconds = presetSeconds;
let intervalId = null;
const display = document.getElementById('display');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');
const presets = document.querySelectorAll('.preset');


function updateDisplay() {
  display.textContent = formatTime(totalSeconds);
}

function tick() {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateDisplay();
  } else {
    clearInterval(intervalId);
    alert("Time's up!");
  }
}

function resetTimer(initialSec = presetSeconds) {
  clearInterval(intervalId);
  intervalId = null;
  totalSeconds = initialSec;
  updateDisplay();
}

presets.forEach(btn => {
  btn.addEventListener('click', () => {
    presetSeconds = parseInt(btn.dataset.seconds, 10);
    resetTimer(presetSeconds);
  });
});

btnStart.addEventListener('click', () => {
  if (intervalId) return;
  intervalId = setInterval(tick, 1000);
});

btnPause.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
});

btnReset.addEventListener('click', () => {
  resetTimer();
});

updateDisplay();
