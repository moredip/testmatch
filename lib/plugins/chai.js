const internals = require('../internalHelpers');

module.exports = function(_chai,utils){
  utils.overwriteMethod( _chai.Assertion.prototype, 'match', function(_super) {
    return function match(specifiedMatch){
      if( !internals.isMatcher(specifiedMatch) ){
        return _super.apply(this, arguments);
      }

      const obj = this._obj;
      this.assert(
        specifiedMatch.matches(obj),
        'expected #{this} to match',
        'expected #{this} to not match'
      );
    }
  });
}
