'use strict';

function Strategy() {};

Strategy.prototype.execute = function(arrToSort) {
  throw new Error('Abstract strategy must be overwritten');
};

module.exports = Strategy;