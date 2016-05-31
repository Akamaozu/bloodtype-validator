module.exports = function is_valid_bloodtype( bloodtype, strict_comparison, callback ){

  // if shorthand function arguments, determine if second argument is strict comparison flag or callback 
    if( arguments.length == 2 ){

      if( typeof strict_comparison === 'function' ){

        callback = strict_comparison;
        strict_comparison = false;
      } 
    }

  // ensure bloodtype is given and is a string
    if( !bloodtype || typeof bloodtype !== 'string' ){

      if( callback ) return callback( new Error( 'bloodtype to check is required and must be a string' ) );

      else return false;
    }

  var bloodtype_validation_regex = strict_comparison ? /^(a?b?|o)([+-])?$/i : /^(a?b?|o)([+-])$/i,
      is_valid = false;

  is_valid = bloodtype_validation_regex.test( bloodtype.trim() );

  if( callback ) return callback( null, is_valid );  

  else return is_valid;
} 