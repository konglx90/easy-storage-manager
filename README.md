### Test

```sh
npm install mocha -g
npm run test  # or mocha
```

### OTHER

1. 采用容忍数组, 强检对象的策略

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
            name: 'string
        }],
    },
    {
        names: [{
            
        }],
    }
) // => true
```

2. Why not prop-types

needn't some type check, like func 