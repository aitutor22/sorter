//variadic function that computes the average time taken for a synchronous function to complete
//takes the function to be tested, number of runs, and (optional) arguments to be passed to the function to be tested
exports.computeTime = function(fn, context, numberOfAttempts) {
  //arguments to be passed to the function
  var slicedArgs = Array.prototype.slice.call(arguments, 2),
      totalTime = 0,
      averageTime;
  
  console.log('Beginning testing');
  for (var i = 0; i < numberOfAttempts; i++) {
      //we want to pass [fn, args1, ..., argsn] rather than 
      //[fn, [[args1, ..., argsn]] and thus we do concat rather than
      //[fn, slicedArgs]
      totalTime += computeTimeHelper.apply(null, [fn, context].concat(slicedArgs));
  }

  function computeTimeHelper(fn, context) {
    //arguments to be passed to fn
    var args = Array.prototype.slice.call(arguments, 2);

    //need to convert to miliseconds as Date objects do string concatenation when using the + operator
    var startTime = new Date().getTime();
    fn.apply(context, args);

    //- operator actually works with two date objects, but using getTime() to do explicitly convert to miliseconds for code robustness
    return new Date().getTime() - startTime;
  }    
  
  averageTime = totalTime / numberOfAttempts;
  return averageTime;
};