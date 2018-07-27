var FLYD_URL, initialUtils, _, print, throwError, expectedType, andJoin;
FLYD_URL = "github.com/paldepind/flyd";
initialUtils = require("@sourcevault/initial.utils");
_ = require("ramda");
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
    head = _.join(", ")(
    _.init(list));
    tail = "and " + _.last(list);
    return head + " " + tail;
  }
};
throwError.amountIsNotInteger = function(type){
  var color, colorizedExpectedType, expectedTypeStr, des, wrongProps, correctParts, correctPartsStr, wrongPropsStr, colorized, unexpectedTypeStr, errText;
  color = print.getColor();
  colorizedExpectedType = _.map(color.highlight, expectedType);
  expectedTypeStr = andJoin(colorizedExpectedType);
  des = type.getDes();
  wrongProps = _.difference(des, expectedType);
  correctParts = _.intersection(des, expectedType);
  correctPartsStr = _.map(color.highlight)(
  _.intersection(expectedType)(
  des));
  wrongPropsStr = _.map(color.attention1, wrongProps);
  colorized = _.concat(wrongPropsStr, correctPartsStr);
  unexpectedTypeStr = andJoin(colorized);
  errText = "- first argument (amount) is of wrong type.\n  - amount value should be a " + expectedTypeStr + ".\n  - current type is " + unexpectedTypeStr + ".\n";
  print.throwTypeError(errText);
};
module.exports = throwError;