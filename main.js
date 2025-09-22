'use strict';

(function () {
  const state = {
    presetSeconds: 120,
    remainingSeconds: 120,
    intervalId: null,
    status: 'idle',
  };

  const display = document.getElementById('display');
  const btnStart = document.getElementById('start');
  const btnPause = document.getElementById('pause');
  const btnReset = document.getElementById('reset');
  const presets = document.querySelectorAll('.preset');
  const statusMessage = document.getElementById('status-message');
  const baseTitle = document.title;

  function setStatusMessage(message) {
    if (statusMessage) {
      statusMessage.textContent = message;
    }
  }

  function updateDocumentTitle() {
    if (state.status === 'running') {
      document.title = `${formatTime(state.remainingSeconds)} • ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }

  function updateDisplay() {
    display.textContent = formatTime(state.remainingSeconds);
    updateDocumentTitle();
  }

  function updatePresetSelection() {
    presets.forEach(btn => {
      const seconds = Number.parseInt(btn.dataset.seconds, 10);
      const isActive = seconds === state.presetSeconds;
      btn.classList.toggle('preset--active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function clearTimer() {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
  }

  function updateControls() {
    const isRunning = state.status === 'running';
    btnStart.disabled = isRunning;
    btnPause.disabled = !isRunning;
    const atPreset = state.remainingSeconds === state.presetSeconds;
    btnReset.disabled = !isRunning && atPreset;
  }

  function setStatus(newStatus, message) {
    state.status = newStatus;
    if (message) {
      setStatusMessage(message);
    }
    updateControls();
  }

  function resetTimer(toSeconds = state.presetSeconds, message) {
    clearTimer();
    state.remainingSeconds = toSeconds;
    display.classList.remove('timer-app__time--complete');
    updateDisplay();
    setStatus('idle', message || `Timer reset to ${formatTime(state.remainingSeconds)}.`);
  }

  function handleCompletion() {
    clearTimer();
    display.classList.add('timer-app__time--complete');
    setStatusMessage("Time's up! Timer reset to the selected preset.");
    state.remainingSeconds = state.presetSeconds;
    updateDisplay();
    setStatus('idle');
    setTimeout(() => {
      display.classList.remove('timer-app__time--complete');
    }, 1200);
  }

  function tick() {
    if (state.remainingSeconds <= 0) {
      handleCompletion();
      return;
    }

    state.remainingSeconds -= 1;
    updateDisplay();

    if (state.remainingSeconds <= 0) {
      handleCompletion();
    }
  }

  function startTimer() {
    if (state.status === 'running') {
      return;
    }

    if (state.remainingSeconds <= 0) {
      state.remainingSeconds = state.presetSeconds;
    }

    updateDisplay();
    state.intervalId = window.setInterval(tick, 1000);
    setStatus('running', `Timer started with ${formatTime(state.remainingSeconds)} remaining.`);
  }

  function pauseTimer() {
    if (state.status !== 'running') {
      return;
    }
    clearTimer();
    setStatus('paused', `Timer paused with ${formatTime(state.remainingSeconds)} remaining.`);
  }

  function selectPreset(seconds) {
    state.presetSeconds = seconds;
    updatePresetSelection();
    resetTimer(seconds, `Preset updated to ${formatTime(seconds)}.`);
  }

  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      const seconds = Number.parseInt(btn.dataset.seconds, 10);
      if (!Number.isFinite(seconds)) {
        return;
      }
      selectPreset(seconds);
    });
  });

  btnStart.addEventListener('click', startTimer);
  btnPause.addEventListener('click', pauseTimer);
  btnReset.addEventListener('click', () => {
    resetTimer(state.presetSeconds, `Timer reset to ${formatTime(state.presetSeconds)}.`);
  });

  updatePresetSelection();
  resetTimer(state.presetSeconds, 'Timer ready. Select a preset to begin.');
})();
