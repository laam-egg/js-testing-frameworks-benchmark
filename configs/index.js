const jasmine_serial = require('./jasmine_serial.js');
const jasmine_parallel = require('./jasmine_parallel.js');
const jest_serial = require('./jest_serial.js');
const jest_parallel = require('./jest_parallel.js');
const mocha_serial = require('./mocha_serial.js');
const mocha_parallel = require('./mocha_parallel.js');

module.exports = {
    jasmine_serial,
    jasmine_parallel,
    mocha_serial,
    mocha_parallel,
    jest_serial,
    jest_parallel,
};
