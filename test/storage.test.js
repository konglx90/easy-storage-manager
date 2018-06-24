const expect = require('chai').expect;
const generateStorageApi = require('../src/storage');

// 模拟 localStorage 的Api
const localStorageSimulate = (() => {
  const local = {};
  return {
    getItem: (key) => local[key],
    setItem: (key, value) => {
      local[key] = value;
    }
  }
})()
let localStorage;
try {
  localStorage = window && window.localStorage;
} catch(e) {}
if (!localStorage) {
  localStorage = localStorageSimulate;
}
// 模拟 localStorage End

const commentListStorage = generateStorageApi.generateArrayStorageApi({
  engine: localStorage,
  key: 'WAIT_COMMENT_LIST',
  validate: [{
    id: 'string',
  }],
  uniqueField: 'rentUnitId',
});

describe('expect', () => {
  it('get array from storage null', () => {
    expect(commentListStorage.get()).to.be.equal(null);
  });

  it('get array from storage array length 1', () => {
    commentListStorage.set([{
      id: '9',
    }])
    expect(commentListStorage.get()).to.have.lengthOf(1);
  });
});
