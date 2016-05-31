---
BLOODTYPE-VALIDATOR 
===============
---

Confirms Value is a Valid Bloodtype


Installation
-
`npm install bloodtype-validator`

Simple Validation
-
```js
require('bloodtype-validator')( 'a' ) // returns true
require('bloodtype-validator')( 'a', function( error, is_valid ){
  
  // is_valid === true
});
```

Strict Validation
-
In addition to being a valid bloodtype, genotype indicator (+/-) must be included. 
```js
require('bloodtype-validator')( 'a', 'strict' ) // returns false
require('bloodtype-validator')( 'a+', 'strict' ) // returns true

require('bloodtype-validator')( 'a', 'strict', function( error, is_valid ){
  
  // is_valid === false
});
require('bloodtype-validator')( 'a+', 'strict', function( error, is_valid ){
  
  // is_valid === true
});
```