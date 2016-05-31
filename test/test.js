var assert = require('assert'),
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
    });
  });
});