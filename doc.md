## Easy storage manager 介绍

### 初衷

1. 集中化存储
2. 简单统一的API

集中化某些特定的功能利于分层(对分离和复用也是有好处的)，就像 redux 只有一个 store.

### 基本设计

不封装的情况下

```js
const HISTORY_RECORD = 'HISTORY_RECORD';
const search = {
 type: 'keywords',
 text: '回龙观',
};
localStorage.setItem(HISTORY_RECORD, [ search ]);

// 在其他地方设置
// localStorage.setItem(HISTORY_RECORD, [ search ]);
// localStorage.setItem(HISTORY_RECORD, [ search ]);
// ...
```

这样简单的做法有两个主要问题:

1. 随着项目的推移, key 可能出现覆盖.
2. 想要添加一些对数组的操作时，可能需要添加零散的函数, 如: `pop push`

于是 引入专门管理 storage 的一层
```js
// storage.js
import { generateArrayStorageApi } from 'easy-storage-manager';

const Keys = {
    HISTORY_RECORD: 'HISTORY_RECORD',
}

export const historyRecordStorage = generateArrayStorageApi({
    engine: window.localStorage,
    key: Keys.HISTORY_RECORD,
    validate: [{
        type: 'string',
        text: 'string',
    }]
    uniqueField: 'text',
});
```

```js
// index.js
import { historyRecordStorage } from './storage';

const search = {
 type: 'keywords',
 text: '回龙观',
};

historyRecordStorage.set([ search ]);
const searches = historyRecordStorage.get();

// more API
historyRecordStorage.push({ type: 'keywords', text: '中关村' });
```

### 关于封装、继承和Minix

目前返回的是一个包含所有方法的新对象, 考虑有没有必要进行面向对象的改造?

[Base on Class](https://github.com/konglx90/easy-storage-manager/issues/3)

### 关于异常的track

### 兼容`React Native`的`AsyncStorage`

### 关于单元测试

1. 积极的寻找测试用例帮助你思考代码
2. 保证以前的测试用例通过

### 参考文章
