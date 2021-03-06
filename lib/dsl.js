const internals = require('./internalHelpers');

module.exports = {
  any: any,
  ofType: ofType,
  eql: eql,
  contains: contains,
  objectWith: objectWith
};

function any(){
  return createMatcher(function (subject) {
    return true;
  });
}

function ofType(expectedType){
  return createMatcher(function (subject) {
    return (typeof subject === expectedType);
  });
}

function eql(expected){
  return createMatcher(function (subject) {
    return expected === subject;  
  });
}

function contains(itemMatcher){
  itemMatcher = coerce(itemMatcher);
  return createMatcher(function (subjectCollection) {
    return subjectCollection.some(itemMatcher.matches);
  });
};

function objectWith(specification){
  return createMatcher(function (subjectObject) {
    let matchFail = false;
    Object.keys(specification).forEach(function(specKey){
      if( matchFail ) return;
      if( !(specKey in subjectObject) ){
        matchFail = true;
        return;
      }

      const subjectValue = subjectObject[specKey];
      const specMatcher = coerce(specification[specKey]);

      if( !specMatcher.matches(subjectValue) ){
        matchFail = true;
      }
    });
    return !matchFail;
  });
}

function coerce(maybeMatcher){
  if( internals.isMatcher(maybeMatcher) ){
    return maybeMatcher;
  }

  return eql(maybeMatcher);
}

function createMatcher(predicateFn){
  return {
    matches: predicateFn
  };
}
