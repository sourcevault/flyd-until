var flydUntil, flyd, wait, fail, send, $send, vals;
flydUntil = require("./main.js");
flyd = require("flyd");
wait = function(t, f){
  return setTimeout(f, t);
};
fail = function(num){
  console.error("[TEST ERROR] originating from module [ github.com/sourcevault/" + MODULE_NAME + " ]\\n\t - 'npm test' failed at TEST " + num + ". \n");
  process.exitCode = 1;
};
send = flyd.stream();
$send = flydUntil(3, send);
vals = [];
$send.map(function(x){
  vals.push(x);
});
wait(100, function(){
  send(1);
});
wait(100, function(){
  send(2);
});
wait(100, function(){
  send(3);
});
wait(100, function(){
  send(4);
});
wait(100, function(){
  send(5);
});
wait(103, function(){
  if (!vals.length === 3) {
    fail(1);
  }
});
console.log("<| TEST 2 |>");
flydUntil(1.2, send);
console.log("<| TEST 3 |>");
flydUntil(-1, send);
console.log("<| TEST 4 |>");
flydUntil(-1.3, send);
console.log("<| TEST 5 |>");
flydUntil({}, send);
console.log("<| TEST 6 |>");
flydUntil(function(){}, send);
console.log("<| TEST 7 |>");
flydUntil(null, send);
console.log("<| TEST 8 |>");
flydUntil(undefined, send);
console.log("<| TEST 9 |>");
flydUntil(Infinity, send);
console.log("<| TEST 10 |>");
flydUntil(100, {});
console.log("<| TEST 11 |>");
flydUntil(100, []);