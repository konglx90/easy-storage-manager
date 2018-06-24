## Easy storage manager

为storage提供一种集中化管理的方法、统一的API, 以及方便的扩展。

### Use

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
historyRecordStorage.push({ type: 'keywords', text: '中关村' });
```

[More](https://github.com/konglx90/easy-storage-manager/blob/master/doc.md)

### Why not `prop-types`

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