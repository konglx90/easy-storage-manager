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

  module.exports = localStorage;