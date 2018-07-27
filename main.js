var flyd, initialUtils, isPositiveIntegerNumber, throwError, wait, _until, validate_and_run;
flyd = require("flyd");
initialUtils = require("@sourcevault/initial.utils");
isPositiveIntegerNumber = initialUtils.numTypes.isPositiveIntegerNumber;
throwError = require("./throwError");
flyd = require("flyd");
wait = function(t, f){
  return setTimeout(f, t);
};
_until = function(amount, stream){
  var count;
  count = 0;
  return flyd.combine(function(downstream, self){
    if (count < amount) {
      count += 1;
      if (count === amount) {
        wait(0, function(){
          return downstream.end(true);
        });
      }
      return downstream();
    } else {
      downstream.end(true);
    }
  }, [stream]);
};
validate_and_run = function(amount, stream){
  var ref$, isCorrectType, type;
  if (!flyd.isStream(stream)) {
    throwError.notFlydStream();
    return null;
  }
  ref$ = isPositiveIntegerNumber(amount), isCorrectType = ref$[0], type = ref$[1];
  if (isCorrectType) {
    return _until(amount, stream);
  } else {
    throwError.amountIsNotInteger(type);
    return null;
  }
};
module.exports = flyd.curryN(2, validate_and_run);