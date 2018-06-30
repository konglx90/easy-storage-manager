const expect = require('chai').expect;
const generateStorageApi = require('../src/storage');

const localStorage = require('./localStorageSimulate');


describe('expect array storage correct', () => {
  const commentListStorage = generateStorageApi.generateArrayStorageApi({
    engine: localStorage,
    key: 'WAIT_COMMENT_LIST',
    validate: [{
      id: 'string',
    }],
    uniqueField: 'rentUnitId',
  });

  it('get array from storage null', () => {
    expect(commentListStorage.get()).to.be.equal(null);
  });

  it('get array from storage array length 1', () => {
    commentListStorage.set([{
      id: '9',
    }])
    expect(commentListStorage.get()).to.have.lengthOf(1);
  });

  it('set array from storage array length 1', () => {
    commentListStorage.set([{
      id: '9',
    }])
    expect(commentListStorage.get()).to.have.lengthOf(1);
  });
});


describe('expect validate', () => {
  const storage = generateStorageApi({
    engine: localStorage,
    key: 'NO_VALIDATE',
  });
  it('no validate', () => {
    expect(storage.set('foo')).to.be.equal(undefined);
  });
});