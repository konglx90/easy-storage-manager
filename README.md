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

```

### Validate rules

#### Import

```js
const validate = require('../src/validate').validateEngine;
```

#### String rules

The type check is based on `Object.prototype.toString.call(o).slice(8, -1).toLocaleLowerCase()`

```js
//  Basic data types
validate('string', 'i am a string') // => true
validate('number', 1) // => true
validate('null', null) // => true
validate('undefined', undefined) // => true

// Object Array
validate('object', {}) // => true
validate('array', []) // => true

```

#### Compose validate rules

```js
// object
validate({ a: 'string', b: 'number'}, {
  a: 'i am a string',
  b: 1,
}) // => true

// array
validate(['string'], ['a', 'b']) // => true
validate(['string'], ['a', 1]) // => false

// if you want two type in a Array
validate(['string|number'], ['a', 1])

// deep
validate([{
    name: 'string',
    girlFrends: [
        {
            name: 'string',
            friends: [
                {
                    name: 'string',
                    classmates: [
                        {
                            name: 'string',
                            hobbies: []
                        }
                    ]
                }
            ]
        }
    ]
}], [{
  name: 'xiaoming',
  girlFrends: [{
    name: 'zhang',
    friends: [{
      name: 'mao',
      classmates: [
        {
          name: 'li',
          hobbies: [],
        }
      ]
    }]
  }],
}]) // => true

```


#### Other

1. 数组可以为空, 对象一定会校验

```js
// can pass validate
validate(
    {
        friends: [{
            name: 'string'
        }],
    },
    {
        names: [],
    }
) // => true

// can't pass validate
validate(
    {
        friends: [{
            name: 'string',
        }],
    },
    {
        names: [{

        }],
    }
) // => true
```

2. Why not `prop-types`

一开始只想简单的验证存入storage的数据, 但是通过不断的给`validate.js`添加功能, 我发现我要的就是一个`prop-types` `>_<`

3. TODO
  - throw a error when check fail, and print the error place
