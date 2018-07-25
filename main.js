var FLYD_URL, flyd, R, initialUtils, numTypes, isPositiveIntegerNumber, print, throwError, expectedType, andJoin, wait, _until, validate_and_run;
FLYD_URL = "github.com/paldepind/flyd";
flyd = require("flyd");
R = require("ramda");
initialUtils = require("@sourcevault/initial.utils");
numTypes = initialUtils.numTypes;
isPositiveIntegerNumber = numTypes.isPositiveIntegerNumber;
print = initialUtils.printError.create("flyd-until", "github.com/sourcevault/flyd-until");
throwError = {};
throwError.notFlydStream = function(){
  var color, fs, f, errText;
  color = print.getColor();
  fs = color.highlight('flyd stream');
  f = color.highlight('flyd');
  errText = "- second argument (stream) is of wrong type.\n  - stream value should be a " + fs + " object.\n\n  - more details on [" + f + "] can be read at:\n    " + color.highlight(FLYD_URL) + "\n";
  return print.throwTypeError(errText);
};
expectedType = ["number", "positive", "integer"];
andJoin = function(list){
  var ret, head, tail;
  switch (list.length) {
  case 0:
    return "";
  case 1:
    return list.join("");
  case 2:
    ret = list[0] + " and " + list[1];
    return ret;
  default:
    head = R.join(", ")(
    R.init(list));
    tail = "and " + R.last(list);
    return head + " " + tail;
  }
};
throwError.amountIsNotInteger = function(type){
  var color, colorizedExpectedType, expectedTypeStr, des, wrongProps, correctParts, correctPartsStr, wrongPropsStr, colorized, unexpectedTypeStr, errText;
  color = print.getColor();
  colorizedExpectedType = R.map(color.highlight, expectedType);
  expectedTypeStr = andJoin(colorizedExpectedType);
  des = type.getDes();
  wrongProps = R.difference(des, expectedType);
  correctParts = R.intersection(des, expectedType);
  correctPartsStr = R.map(color.highlight)(
  R.intersection(expectedType)(
  des));
  wrongPropsStr = R.map(color.attention1, wrongProps);
  colorized = R.concat(wrongPropsStr, correctPartsStr);
  unexpectedTypeStr = andJoin(colorized);
  errText = "- first argument (amount) is of wrong type.\n  - amount value should be a " + expectedTypeStr + ".\n  - current type is " + unexpectedTypeStr + ".\n";
  print.throwTypeError(errText);
};
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