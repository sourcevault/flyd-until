#  ```flyd-until```


[![Build Status](https://travis-ci.org/sourcevault/flyd-until.svg?branch=dev)](https://travis-ci.org/sourcevault/flyd-until)

```
upstream:                     [-a-b-c-d-e------------]
flydUntil(3,stream):          [-.-.-.----------------]
downstream:                     a b c    
```

*install..*

```
npm install flyd-until
npm install sourcevault/flyd-until#dist
```



*simple example ..*

```js

var flydUntil = require ("flyd-until") 

var send = flyd.stream()

flydUntil(3,send)
.map (function (x){
   console.log(x); // a b c
})

setTimeout(function(){
	send("a")
	send("b")
	send("c")
	send("d")
	send("e")
},100)

```

## LICENCE

Code and documentation is released under MIT Licence, see [LICENSE](https://github.com/sourcevault/flyd-group-within/blob/dist/LICENCE) for details.