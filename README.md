## Easy storage manager

为storage提供一种集中化管理的方法、统一的API, 以及方便的扩展。

### Feature

示例:

```js
import generateStorageApi from 'easy-storage-manager';
const enterCount = generateStorageApi({
    engine: window.localStorage,
    space: 'myAppName',
    key: 'ENTER_COUNT',
    validate: 'number',
    defaultMaxAge: 24 * 60 * 60 * 1000, // MILLISECONDS_EACH_DAY
});
enterCount.set(1);

// extend a method inc for enterCount
enterCount.inc = function inc() {
  const count = this.get() || 0;
  this.set(count + 1);
};
enterCount.inc();
enterCount.inc();
```

#### small API

只有两个

```js
generateStorageApi // => get set 
generateArrayStorageApi // => get set push pop update
```

#### different storage extend

1. window.sessionStorage
2. window.localStorage

```js
engine: window.localStorage, // window.sessionStorage
```

#### validate

数据验证 [more rules](https://github.com/konglx90/data-validate)

如果项目已经引入prop-types, 可以选择prop-types的验证方式

```js
const config = {
    validate: (data) => PropTypes.checkPropTypes({ 
            data: PropTypes.string, // validate
        },
        { data },
        'prop',
        'validate in storage'
    ),
    ...
}
```

#### space

避免键名冲突

#### defaultMaxAge

设置数据过期时间

```js
const s = generateStorageApi({
  defaultMaxAge: 1000, // 1000 毫秒，默认为不过期
  ...
});

// 为某条数据单独设置过期时间
s.set('', 2000); // 2000 毫秒
```

### Array Data

在本地需要存储搜索的历史纪录，涉及 `get set push update` 等操作.

```js
// index.js
import { generateArrayStorageApi } from 'easy-storage-manager';

const Keys = {
    HISTORY_RECORD: 'HISTORY_RECORD',
}

const historyRecordStorage = generateArrayStorageApi({
    engine: window.localStorage,
    key: Keys.HISTORY_RECORD,
    validate: [{
        type: 'string',
        text: 'string',
    }]
    uniqueField: 'text',
});

const search = {
 type: 'keywords',
 text: '回龙观',
};

historyRecordStorage.set([ search ]);
const searches = historyRecordStorage.get();

// more API
historyRecordStorage.push({ type: 'keywords', text: '中关村' });
```

[More](https://github.com/konglx90/easy-storage-manager/blob/master/doc.md)

### Why not `prop-types`, but [data-validate](https://github.com/konglx90/easy-storage-manager/blob/master/doc.md)

因为一开始只想简单的验证存入storage的数据, 但是通过不断的给`validate`添加功能, 我发现我要的就是一个`prop-types` `>_<`

### Test

```sh
npm install mocha -g
npm run test  # or mocha
```

### Publish

```js
npm version [higher version]
npm publish
```
