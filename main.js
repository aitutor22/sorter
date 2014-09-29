'use strict';

var _ = require('lodash'),
  Strategy = require('./strategy'),
  ComputeTime = require('./computetime');

//main sorter object that uses different sorting algorithm based on the Strategy Pattern
function Sorter(arr) {
  this.unsortedArr = arr;
  this.sortedArr;
  this.sortStrategy;
}

Sorter.prototype.setSortStrategy = function(strategy) {
  this.sortStrategy = strategy;
  return this;
};

Sorter.prototype.sort = function() {
  if (typeof this.sortStrategy === 'undefined') throw new Error('No strategy set');
  
  //sorts a copy of unsortedArr
  return this.sortStrategy.execute(this.unsortedArr.slice());
};

var testArr = [],
  sortedTestArr,
  NUMBER_OF_ITEMS = 10000,
  MIN = -1000,
  MAX = 1000;

//creates a test array of numbers between MIN and MAX
for (var i = 0; i < NUMBER_OF_ITEMS; i++) {
  testArr[i] = Math.floor((MAX + Math.abs(MIN)) * Math.random()) + MIN;
};

sortedTestArr = (testArr.slice()).sort(function(a, b) {
  return a - b;
});

var result = {};
var sorter = new Sorter(testArr);

for (var strategy in Strategy) {
  sorter.setSortStrategy(new Strategy[strategy]);
  console.log(strategy)
  result[strategy] = ComputeTime.computeTime(sorter.sort, sorter, 10);
};

console.log(result);
