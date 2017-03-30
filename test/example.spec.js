const M = require('../lib/dsl');

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

    //return apiClient.getUser(theUserId)
    //.then(function (user) {
      //expect(user).to.match(expectedResult)
    //});
    
    const result = apiClient.getUser(theUserId);
    return expect(result).to.eventually.match(M.objectWith({
      found: true,
      user: M.objectWith({
        id: theUserId,
        firstName: M.any(),
        lastName: M.any()
      })
    }));
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
