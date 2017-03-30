const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const chaiPlugin = require('../lib/plugins/chai');

// have to jump through some hoops to ensure that chaiAsPromised is the final plugin to be added
const setupMarker = Symbol.for('MOCHA_SETUP_MARKER');
if( !(setupMarker in chai) ){
  chai.use(chaiPlugin);
  chai.use(chaiAsPromised);
  chai[setupMarker] = true;
}

global.expect = chai.expect;
