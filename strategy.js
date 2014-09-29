'use strict';

var _ = require('lodash'),
  Heap = require('./heap');

function Strategy() {};

Strategy.prototype.execute = function(arrToSort) {
  throw new Error('Abstract strategy must be overwritten');
};

function BubbleSort() {};
BubbleSort.prototype = Object.create(Strategy.prototype);
BubbleSort.prototype.execute = function(arrToSort) {
  if (typeof arrToSort === 'undefined' || !(arrToSort instanceof Array)) throw new Error('invalid arugment');
  
  var swapped, temp, len = arrToSort.length - 1;

  do {
    swapped = false;
    for (var i = 0; i < len; i++) {
      if (arrToSort[i] > arrToSort[i + 1]) {
        temp = arrToSort[i];
        arrToSort[i] = arrToSort[i + 1];
        arrToSort[i + 1] = temp;
        swapped = true;
      }
    };
    //after each iteration, we have one more element that is correctly sorted and we don't need to sort it
    len--;
  } while (swapped);
  return arrToSort;
}

function OddEvenSort() {};
OddEvenSort.prototype = Object.create(Strategy.prototype);
OddEvenSort.prototype.execute = function(arrToSort) {
  if (typeof arrToSort === 'undefined' || !(arrToSort instanceof Array)) throw new Error('invalid arugment');

  var swapped, temp, phase = 0;

  do {
    swapped = false;
    for (var i = phase; i < arrToSort.length - 1; i += 2) {
      if (arrToSort[i] > arrToSort[i + 1]) {
        temp = arrToSort[i];
        arrToSort[i] = arrToSort[i + 1];
        arrToSort[i + 1] = temp;
        swapped = true;
      }
    };
    phase = (phase + 1) % 2;
  } while (swapped);
  return arrToSort;
};


function InsertionSort() {};
InsertionSort.prototype = Object.create(Strategy.prototype);
InsertionSort.prototype.execute = function(arrToSort) {
  for (var i = 1; i < arrToSort.length; i++) {

    if (arrToSort[i] > arrToSort[i - 1]) continue;
    var j = i - 1, temp = arrToSort[i];

    while (j >= 0 && arrToSort[j] > temp) {
      arrToSort[j + 1] = arrToSort[j];
      j--;
    };
    arrToSort[j + 1] = temp;
  };
  return arrToSort;
};

function SelectionSort(){};
SelectionSort.prototype = Object.create(Strategy.prototype);
SelectionSort.prototype.execute = function(arrToSort) {
  for (var i = 0; i < arrToSort.length; i++) {
    //find min
    var min = Number.POSITIVE_INFINITY, minIndex;
    for (var j = i; j < arrToSort.length; j++) {
      if (arrToSort[j] < min) {
        min = arrToSort[j];
        minIndex = j;
      };
    };

    arrToSort[minIndex] = arrToSort[i];
    arrToSort[i] = min;
  };
  return arrToSort;
};

function QuickSort() {};
QuickSort.prototype = Object.create(Strategy.prototype);
QuickSort.prototype.execute = function(arrToSort) {

  function partition(first, last) {
    var left, right, partitionIndex, partitionVal, temp;

    partitionIndex = Math.floor((last - first) / 2) + first;
    partitionVal = arrToSort[partitionIndex];

    //base case - if there is only 1 element, it is already sorted
    if (first >= last) return;

    left = first;
    right = last;

    while (left <= right) {
      while (arrToSort[left] < partitionVal) left++;
      while (arrToSort[right] > partitionVal) right--;

      //checks that pointers have not crossed, then swap
      if (left <= right) {
        temp = arrToSort[left];
        arrToSort[left] = arrToSort[right];
        arrToSort[right] = temp;

        //move the counters
        left++;
        right--;
      };
    };

    // console.log('left: ' + left + '; right: ' + right);
    //at the end of the while loop, left will be larger than right
    //we now run the partition function recusively on the two sub arrays to sort them
    partition(first, right);
    partition(left, last);
  }; //end partition function

  partition(0, arrToSort.length - 1);
  return arrToSort;
};

function MergeSort() {};
MergeSort.prototype = Object.create(Strategy.prototype);
MergeSort.prototype.execute = function(arrToSort) {
  function mSort(tempArr) {
    var pivot = Math.floor(tempArr.length / 2),
      left = tempArr.slice(0, pivot),
      right = tempArr.slice(pivot);

    if (tempArr.length <= 1) return tempArr;

    return merge(mSort(left), mSort(right));
  };

  function merge(leftArr, rightArr) {
    var result = [],
      i = 0,
      j = 0;

    while (i < leftArr.length || j < rightArr.length) {
      if (i === leftArr.length) {
        result.push(rightArr[j]);
        j++;
      } else if (j === rightArr.length) {
        result.push(leftArr[i]);
        i++;
      } else if (leftArr[i] < rightArr[j]){
        result.push(leftArr[i]);
        i++;  
      } else {
        result.push(rightArr[j]);
        j++
      }
    };
    return result;
  }; //end merge function

  return mSort(arrToSort);
};

function HeapSort() {};
HeapSort.prototype = Object.create(Strategy.prototype);
HeapSort.prototype.execute = function(arrToSort) {
  var heap = new Heap(),
    result = [];

  _.each(arrToSort, function(element) {
    heap.insert(element);
  });

  while (!heap.isEmpty()) {
    result.unshift(heap.remove());
  };

  return result;
};


module.exports = {
  BubbleSort: BubbleSort,
  OddEvenSort: OddEvenSort,
  InsertionSort: InsertionSort,
  SelectionSort: SelectionSort,
  QuickSort: QuickSort,
  MergeSort: MergeSort,
  HeapSort: HeapSort
};