const assert = require('assert');
const formatTime = require('../formatTime');

assert.strictEqual(formatTime(0), '00:00');
assert.strictEqual(formatTime(65), '01:05');
assert.strictEqual(formatTime(3599), '59:59');
assert.strictEqual(formatTime(3605), '60:05');
assert.strictEqual(formatTime(65.9), '01:05', 'fractions should be floored');
assert.strictEqual(formatTime(-20), '00:00', 'negative values should clamp to zero');
assert.strictEqual(formatTime(Number.POSITIVE_INFINITY), '00:00', 'non-finite values should fall back to zero');

console.log('All tests passed.');

