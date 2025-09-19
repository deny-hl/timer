const assert = require('assert');
const formatTime = require('../formatTime');

assert.strictEqual(formatTime(0), '00:00');
assert.strictEqual(formatTime(65), '01:05');
assert.strictEqual(formatTime(3599), '59:59');

console.log('All tests passed.');

