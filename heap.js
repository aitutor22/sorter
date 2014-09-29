function Heap() {
  this.items = [];
}

Heap.prototype.insert = function(element) {
  var that = this;
  //adds to end of array    
  this.items.push(element);
  recusivelyUpHeap(this.items.length - 1);
  
  function recusivelyUpHeap(index) {
    //base case - already root element
    if (index === 0) return;
    
    //base case - element smaller than parent
    var parentIndex = Math.floor((index - 1) / 2);  
    if (that.items[index] < that.items[parentIndex]) return;

    //swaps element with its parent
    var temp = that.items[parentIndex];
    that.items[parentIndex] = that.items[index];
    that.items[index] = temp;
    
    recusivelyUpHeap(parentIndex);
  }
};

Heap.prototype.isEmpty = function() {
  return this.items.length <= 0;
};

Heap.prototype.remove = function() {
  if (this.items.length === 0) throw new Error('Heap has no elements');
  
  var that = this;
  //root item is the largest
  var result = this.items[0];
  
  //sets new root to last element in heap
  this.items[0] = this.items[this.items.length - 1];
  //pops the last element
  this.items.pop();
  
  recusivelyDownHeap(0);
  
  function recusivelyDownHeap(index) {
    //base case - no children
    if (index * 2 + 1 > that.items.length - 1) return;     
    
    //base case - element bigger than largest child
    var largerChildIndex = getLargerChildIndex(index);        
    if (that.items[index] > that.items[largerChildIndex]) return;
    
    //swaps element with larger child
    var temp = that.items[largerChildIndex];
    that.items[largerChildIndex] = that.items[index];
    that.items[index] = temp;
    
    recusivelyDownHeap(largerChildIndex);        
  };
  
  //while we check that leftChild is not undefined before calling getLargerChildIndex
  //, it is possible that rightChild could be undefined; if so, then return left child    
  function getLargerChildIndex(index) {
    var leftChildIndex = index * 2 + 1,
      rightChildIndex = index * 2 + 2;
    
    if (typeof that.items[rightChildIndex] === 'undefined' ) return leftChildIndex;
    
    return that.items[leftChildIndex] > that.items[rightChildIndex] ? leftChildIndex : rightChildIndex;
  }
  return result;
}

Heap.prototype.print = function() {
  for (var i = 0; i < this.items.length; i++ ){
    console.log(this.items[i]);
  }
};

module.exports = Heap;