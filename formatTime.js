function formatTime(sec) {
  const safeSeconds = Number.isFinite(sec) ? Math.max(0, Math.floor(sec)) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

if (typeof module !== 'undefined') {
  module.exports = formatTime;
} else {
  window.formatTime = formatTime;
}
