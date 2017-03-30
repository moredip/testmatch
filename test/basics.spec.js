const assert = require('assert');

describe('the basics', function () {
  describe('equality', function () {
    it('is true when equal', function () {
      const matcher = M.eql(10)
      assert(matcher.matches(10));
    });

    it('is false when not equal', function () {
      const matcher = M.eql(10)
      assert(!matcher.matches(11));
    });
  });
});

const M = {
  eql(expected){
    return createMatcher(function (actual) {
      return expected === actual;  
    });
  }
}

function createMatcher(predicateFn){
  return {
    matches: predicateFn
  };
}
