const sinon = require('sinon');
const M = require('../lib/dsl');

describe('testing a JSON API', function () {

  const apiClient = createApiClient({request:fakeRequest});

  it('BEFORE returns a user when given a legit id', function () {
    const theUserId = '1234';
    return apiClient.getUser(theUserId).then(function (result) {
      expect(result).to.have.property('found',true);
      expect(result).to.have.property('user');
      expect(result.user).to.have.property('id').a('string');
      expect(result.user).to.have.property('firstName').a('string');
      expect(result.user).to.have.property('lastName').a('string');
    });
  });

  it('returns a user when given a legit id', function () {
    const theUserId = '1234';
    const expectedResult = M.objectWith({
      found: true,
      user: M.objectWith({
        id: M.ofType("string"),
        firstName: M.ofType("string"),
        lastName: M.ofType("string")
      })
    });

    return apiClient.getUser(theUserId)
    .then(function (user) {
      expect(user).to.match(expectedResult)
    });
    
    const result = apiClient.getUser(theUserId);
    return expect(result).to.eventually.match(M.objectWith({
      found: true,
      user: M.objectWith({
        id: M.ofType("string"),
        firstName: M.ofType("string"),
        lastName: M.ofType("string")
      })
    }));
  });

  it('makes a call with the right path and query params', function () {
    const spyRequestFn = sinon.stub().returns(fakeRequest());
    const apiClient = createApiClient({request:spyRequestFn});

    const theUserId = '4213';

    return apiClient.getUser(theUserId)
      .then(function () {
        expect(spyRequestFn).to.have.been.called;

        const requestParams = spyRequestFn.firstCall.args[0];

        expect(requestParams).to.have.property('baseUrl').a('string');
        expect(requestParams).to.have.property('uri', '/findUser');
        expect(requestParams).to.have.property('qs');
        expect(requestParams.qs).to.have.property('id',theUserId);

        expect(requestParams).to.match(M.objectWith({
          baseUrl: M.ofType('string'),
          uri: '/findUser',
          qs: M.objectWith({
            id: theUserId
          })
        }));


        //expect(spyRequestFn).to.have.been.calledWithMatch(M.objectWith({
          //uri: '/findUser',
          //qs: M.objectWith({
            //id: theUserId
          //})
        //}));
      });
  });
});

function fakeRequest(){
  return Promise.resolve();
}

function createApiClient({request}={}){
  function getUser(userId){
    return request({
      uri: '/findUser',
      baseUrl: 'example.org',
      qs: {
        id: userId
      }
    }).then(parseResponse);
  }

  return {
    getUser
  };
}

function parseResponse(response){
  // TODO: implement me :)
  return {
    found: true,
    user: {
      id: 'todo',
      firstName: 'Dave',
      lastName: 'Bonds'
    }
  };
}
