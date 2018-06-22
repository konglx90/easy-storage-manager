const expect = require('chai').expect;
const Storage = require('../lib/storage');

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

const commentStorage = new Storage({
    engine: localStorage,
    key: 'CAN_COMMENT_RENT_LIST',
    validate: 'string',
});

const bStorage = new Storage({
  engine: localStorage,
  key: 'B',
  validate: 'string',
});

console.log(bStorage.set === commentStorage.set);

describe('expect', () => {
  it('commentStorage', () => {
    commentStorage.set('good')
    expect(commentStorage.get()).to.be.equal('good');
  });
});
