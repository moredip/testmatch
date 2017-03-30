const assert = require('assert');
const chai = require('chai');

const M = require('../lib/dsl');

const chaiPlugin = require('../lib/plugins/chai');
chai.use(chaiPlugin);
const expect = chai.expect;

describe('testing a JSON API', function () {
  const apiClient = createApiClient();

  it('returns a user when given a legit id', function () {
    const theUserId = '1234';
    const expectedResult = M.objectWith({
      found: true,
      user: M.objectWith({
        id: theUserId,
        firstName: M.any(),
        lastName: M.any()
      })
    });

    return apiClient.getUser(theUserId)
    .then(function (user) {
      expect(user).to.match(expectedResult)
    });
  });
});

function createApiClient(){
  function getUser(userId){
    return Promise.resolve({
      found: true,
      user: {
        id: userId,
        firstName: 'Dave',
        lastName: 'Bonds'
      }
    });
  }

  return {
    getUser
  };
}
