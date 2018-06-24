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

const enterCount = generateStorageApi({
    engine: localStorage,
    space: 'myAppName',
    key: 'ENTER_COUNT',
    validate: 'number',
    defaultMaxAge: 24 * 60 * 60 * 1000, // MILLISECONDS_EACH_DAY
});
enterCount.inc = function inc() {
  const count = this.get() || 0;
  this.set(count + 1);
};

describe('expect', () => {
  it('...', () => {
    enterCount.set(0)
    expect(enterCount.get()).to.be.equal(0);

    enterCount.inc();
    expect(enterCount.get()).to.be.equal(1);
  });
});
