const assert = require('assert');

describe('the basics', function () {
  describe('equality', function () {
    specify('is equal', function () {
      const matcher = M.eql(10)
      assert(matcher.matches(10));
    });

    specify('is not equal', function () {
      const matcher = M.eql(10)
      assert(!matcher.matches(11));
    });
  });

  describe('contains', function () {
    specify('single element which matches', function () {
      const subject = [10];
      const matcher = M.contains(M.eql(10));
      assert(matcher.matches(subject));
    });

    specify('single element which does not match', function () {
      const subject = [10];
      const matcher = M.contains(M.eql(11));
      assert(!matcher.matches(subject));
    });

    specify('multiple elements, some match', function () {
      const subject = [8,9,10,11,12];
      const matcher = M.contains(M.eql(10));
      assert(matcher.matches(subject));
    });
  });

  describe('coersion', function () {
    specify('primitive -> equality', function () {
      const subject = [1,2,3];
      const matcher = M.contains(2);
      assert(matcher.matches(subject));
    });
    
  });
});

const M = {
  eql(expected){
    return createMatcher(function (subject) {
      return expected === subject;  
    });
  },
  contains(itemMatcher){
    itemMatcher = coerce(itemMatcher);
    return createMatcher(function (collection) {
      return collection.some(itemMatcher.matches);
    });
  }
}

function coerce(maybeMatcher){
  if( typeof maybeMatcher.matches === 'function' ){
    return maybeMatcher;
  }

  return M.eql(maybeMatcher);
}

function createMatcher(predicateFn){
  return {
    matches: predicateFn
  };
}
