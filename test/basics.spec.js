const assert = require('assert');

const M = require('../lib/dsl');

describe('the basics', function () {
  function shouldMatch(matcher,subject){
    assert(matcher.matches(subject), 'Matcher did not match when it should have');
  }

  function shouldNotMatch(matcher,subject){
    assert(!matcher.matches(subject), 'Matcher matched when it should not have');
  }

  describe('equality', function () {
    specify('is equal', function () {
      shouldMatch(
        M.eql(10),
        10
      );
    });

    specify('is not equal', function () {
      shouldNotMatch(
        M.eql(10),
        11
      );
    });
  });

  describe('any', function () {
    it('always matches', function () {
      shouldMatch( M.any(), 'foo' );
      shouldMatch( M.any(), [1,2,3] );
      shouldMatch( M.any(), {} );
      shouldMatch( M.any(), true );
      shouldMatch( M.any(), false );
      shouldMatch( M.any(), undefined );
    });
  });

  describe('anyInstanceOf', function () {
    it('matches strings', function () {
      shouldMatch(
        M.ofType('string'),
        "123"
      );
    });
  });

  describe('contains', function () {
    specify('single element which matches', function () {
      shouldMatch(
        M.contains(M.eql(10)),
        [10]
      );
    });

    specify('single element which does not match', function () {
      shouldNotMatch(
        M.contains(M.eql(11)),
        [10]
      );
    });

    specify('multiple elements, some match', function () {
      shouldMatch(
        M.contains(M.eql(10)),
        [8,9,10,11]
      );
    });
  });

  describe('object subset', function () {
    specify('exact match', function () {
      const subject = {
        foo: '123'
      };
      const matcher = M.objectWith({
        foo: '123'
      });
      shouldMatch( matcher, subject );
    });

    specify('superset of spec', function () {
      const subject = {
        foo: '123',
        bar: 'blah'
      };
      const matcher = M.objectWith({
        foo: '123'
      });
      shouldMatch( matcher, subject );
    });

    specify('correct property, diff value', function () {
      const subject = {
        foo: '123'
      };
      const matcher = M.objectWith({
        foo: '23'
      });
      shouldNotMatch( matcher, subject );
    });
    
    describe('checking presence of key', function () {
      const matcher = M.objectWith({
        specific: 'value',
        required: M.any()
      });

      it('matches when key is present but undefined', function () {
        const subject = {
          specific: 'value',
          required: undefined
        };
        shouldMatch( matcher, subject );
      });
      
      it('fails when required key not present', function () {
        const subject = {
          specific: 'value'
        };
        shouldNotMatch( matcher, subject );
      });
    });

  });

  describe('coersion', function () {
    specify('primitive -> equality', function () {
      shouldMatch(
        M.contains(2),
        [1,2,3]
      );
    });
  });
});
