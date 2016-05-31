var assert = require('assert'),
    valid_bloodtypes = ['a', 'b', 'ab', 'o'],
    bloodtype_validator = require('../bloodtype_validator');

describe('Bloodtype Validator Test Suite', function(){
  
  describe('About Bloodtype Validator Export', function(){

    it('is a function', function(){

      assert( typeof bloodtype_validator, 'function', 'is not a function' );
    });
  });
  
  describe('About Exported Bloodtype Validator Function Behavior', function(){

    it('returns a boolean if no callback is given', function(){

      var booleans = [ true, false ];

      assert.strictEqual( booleans.indexOf( bloodtype_validator('a') ) > -1, true, 'did not return a boolean' );
      assert.strictEqual( booleans.indexOf( bloodtype_validator('a', 'strict') ) > -1, true, 'did not return a boolean on strict comparison' );
    });

    it('has no return value if a callback is given', function(){

      assert.strictEqual( typeof bloodtype_validator('a', function(){}), 'undefined', 'returned a value when callback was given' );
      assert.strictEqual( typeof bloodtype_validator('a', 'strict', function(){}), 'undefined', 'returned a value on strict comparison when callback was given' );
    });

    describe('Without Callback', function(){

      it('returns false if bloodtype is not a string', function(){

        assert.strictEqual( bloodtype_validator(1), false, 'did not return false when bloodtype given was a number');
        assert.strictEqual( bloodtype_validator([]), false, 'did not return false when bloodtype given was an array');
        assert.strictEqual( bloodtype_validator({}), false, 'did not return false when bloodtype given was an object');
        assert.strictEqual( bloodtype_validator(function(){}), false, 'did not return false when bloodtype given was a function');
      });

      it('returns false if correct bloodtype has incorrect preceeding character', function(){

        assert.strictEqual( bloodtype_validator('va'), false, 'returned true with incorrect preceeding character' );
      });

      it('returns false if correct bloodtype has incorrect proceeding character', function(){

        assert.strictEqual( bloodtype_validator('av'), false, 'returned true with incorrect proceeding character' );
      });

      it('returns false if correct bloodtype has incorrect intermediary character', function(){

        assert.strictEqual( bloodtype_validator('avb'), false, 'returned true with incorrect intermediary character' );
      });

      it('returns false if genotype indicator (+/-) is missing on strict comparison', function(){

        assert.equal( bloodtype_validator('a', 'strict'), false, 'did not return false when genotype indicator was missing' );
      });

      it('does not reject valid bloodtypes', function(){

        valid_bloodtypes.forEach( function( bloodtype ){

          assert.strictEqual( bloodtype_validator( bloodtype ), true, 'rejected "' + bloodtype + '"' );
        });
      });

      it('rejects valid bloodtypes without genotype indictor on strict comparison', function(){

        valid_bloodtypes.forEach( function( bloodtype ){

          assert.strictEqual( bloodtype_validator( bloodtype, 'strict' ), false, 'accepted "' + bloodtype + '" as valid on strict comparison' );
        });
      });

      it('is not case-sensitive', function(){

        valid_bloodtypes.forEach( function( bloodtype ){

          var bloodtype_to_check = bloodtype.toUpperCase();

          assert.strictEqual( bloodtype_validator( bloodtype_to_check ), true, 'rejected uppercase "' + bloodtype + '"' );
          assert.strictEqual( bloodtype_validator( bloodtype_to_check + '-', 'strict' ), true, 'rejected uppercase "' + bloodtype + '" on strict comparison' );
        });
      });
    });

    describe('With Callback', function(){

      var Task = require('cjs-task');

      it('returns error if bloodtype is not a string', function( done ){

        var task = Task();

        task.step('check if validator rejects number bloodtype', function(){

          bloodtype_validator(1, function( error ){

            assert.strictEqual( error instanceof Error, true, 'did not return an error object when bloodtype given was a number');

            task.next();
          });
        });

        task.step('check if validator rejects array bloodtype', function(){

          bloodtype_validator([], function( error ){

            assert.strictEqual( error instanceof Error, true, 'did not return an error object when bloodtype given was an array');

            task.next();
          });
        });

        task.step('check if validator rejects object bloodtype', function(){

          bloodtype_validator({}, function( error ){

            assert.strictEqual( error instanceof Error, true, 'did not return an error object when bloodtype given was an object');

            task.next();
          });
        });

        task.step('check if validator rejects function bloodtype', function(){

          bloodtype_validator(function(){}, function( error ){

            assert.strictEqual( error instanceof Error, true, 'did not return an error object when bloodtype given was a function');

            task.next();
          });
        });

        task.callback( done );

        task.start();
      });

      it('returns error if correct bloodtype has incorrect preceeding character', function( done ){

        bloodtype_validator('va', function( error ){

          assert.strictEqual( error instanceof Error, false, 'did not return an error object with incorrect preceeding character' );
          done();
        });        
      });

      it('returns error if correct bloodtype has incorrect proceeding character', function( done ){

        bloodtype_validator('av', function( error ){

          assert.strictEqual( error instanceof Error, false, 'did not return an error object with incorrect proceeding character' );
          done();
        });
      });

      it('returns error if correct bloodtype has incorrect intermediary character', function( done ){

        bloodtype_validator('avb', function( error ){

          assert.strictEqual( error instanceof Error, false, 'did not return an error object with incorrect intermediary character' );
          done();
        });
      });

      it('no error if genotype indicator (+/-) is missing on strict comparison', function( done ){

        bloodtype_validator('a', 'strict', function( error ){

          assert.equal( error instanceof Error, false, 'returned an error object when genotype indicator was missing' );
          done();
        });
      });

      it('does not reject valid bloodtypes', function( done ){

        var task = Task();

        valid_bloodtypes.forEach( function( bloodtype ){

          task.step('check if accepts ' + bloodtype, function(){

            var bloodtype_to_check = arguments[0];

            return function(){

              bloodtype_validator( bloodtype_to_check, function( error, is_valid ){

                assert.strictEqual( is_valid, true, 'rejected "' + bloodtype_to_check + '"' );
                task.next();
              });            
            }
          }( bloodtype ));          
        });

        task.callback( done );

        task.start();
      });

      it('rejects valid bloodtypes without genotype indictor on strict comparison', function( done ){

        var task = Task();

        valid_bloodtypes.forEach( function( bloodtype ){

          task.step('check if rejects ' + bloodtype + ' without genotype indicator', function(){

            var bloodtype_to_check = arguments[0];

            return function(){

              bloodtype_validator( bloodtype_to_check, 'strict', function( error, is_valid ){

                assert.strictEqual( is_valid, false, 'accepted "' + bloodtype_to_check + '" as valid on strict comparison' );
                task.next();
              });            
            }
          }( bloodtype ));          
        });

        task.callback( done );

        task.start();
      });

      it('is not case-sensitive', function( done ){

        var task = Task();

        valid_bloodtypes.forEach( function( bloodtype ){

          task.step('check if accepts uppercase' + bloodtype, function(){

            var bloodtype_to_check = arguments[0].toUpperCase();

            return function(){

              bloodtype_validator( bloodtype_to_check, function( error, is_valid ){

                assert.strictEqual( is_valid, true, 'rejected uppercase "' + bloodtype_to_check.toLowerCase() + '"' );
                task.next();
              });            
            }
          }( bloodtype ));

          task.step('check if accepts uppercase' + bloodtype + 'on strict comparison', function(){

            var bloodtype_to_check = arguments[0].toUpperCase();

            return function(){

              bloodtype_validator( bloodtype_to_check + '-', function( error, is_valid ){

                assert.strictEqual( is_valid, true, 'rejected uppercase "' + bloodtype_to_check.toLowerCase() + '-" on strict comparison' );
                task.next();
              });            
            }
          }( bloodtype ));          
        });

        task.callback( done );

        task.start();
      });
    });
  });
});