module.exports = function is_valid_bloodtype( bloodtype, strict_comparison ){

  if( !bloodtype || typeof bloodtype !== 'string' ) return false;

  var bloodtype_validation_regex = /^(a?b?|o)([+-])?$/i;
  
  if( strict_comparison ) bloodtype_validation_regex = /^(a?b?|o)([+-])$/i;  

  return bloodtype_validation_regex.test( bloodtype.trim() );
} 