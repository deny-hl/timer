'use strict';

let totalSeconds = 120;
let intervalId = null;
const display = document.getElementById('display');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');
const presets = document.querySelectorAll('.preset');


function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

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

function resetTimer(initialSec = 120) {
  clearInterval(intervalId);
  intervalId = null;
  totalSeconds = initialSec;
  updateDisplay();
}

presets.forEach(btn => {
  btn.addEventListener('click', () => {
    const secs = parseInt(btn.dataset.seconds, 10);
    resetTimer(secs);
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
  clearInterval(intervalId);
  intervalId = null;
  totalSeconds = 120;
  updateDisplay();
});

updateDisplay();
