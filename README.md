### Test

```sh
npm install mocha -g
npm run test  # or mocha

# test index
mocha test/index.test.js
```

### Easy storage manager


#### Import

```js
// 

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
```

2. Why not `prop-types`

一开始只想简单的验证存入storage的数据, 但是通过不断的给`validate.js`添加功能, 我发现我要的就是一个`prop-types` `>_<`

3. TODO
  - throw a error when check fail, and print the error place

### Publish

```js
npm version [higher version]
npm publish
```