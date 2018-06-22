const validateEngine = require('@konglx/data-validate');

const fieldEqual = (a, b, field) => {
  if (!a || !b) {
    return false;
  }
  if (!a[field] || !a[field]) {
    return false;
  }
  return a[field] === b[field];
}
const findIndexByField = (arr, obj, field) => {
  return arr.reduce((acc, cur, index) => {
    if (fieldEqual(cur, obj, field)) {
      return index;
    }
    return acc;
  }, -1);
};

/**
 * Return store Api by use store key
 *
 * Examples:
 *
 *    const userInfoStore =
 *                  generateStorageApi(localStorage, Keys.USER_INFO, 30 * MILLISECONDS_EACH_DAY)
 *    userInfoStore.set({name: 'konglingxing'})
 *    const userInfo = userInfoStore.get()
 * @param {Storage} engine
 * @param {String} key
 * @param {Array} essentialData
 * @param {Number} defaultExpire
 * @param {string} uniqueField 当数据是包含对象的数组时, 用来标识一个数据的身份
 * @return {object}
 */

 class Storage {
    engine = null;
    key = null;
    validate = null;
    defaultExpire = null;

    constructor({ engine, key, validate, defaultExpire }) {
        this.engine = engine;
        this.key = key;
        this.validate = validate;
        this.defaultExpire = defaultExpire;
    }

    set = (data, expire = this.defaultExpire) => {
        const { key, validate, engine } = this;

        // validate essential data
        // 非严格限制
        // PropTypes.checkPropTypes({ data: validate }, { data }, 'prop', `set storage ${key}`);
        if (!validateEngine(validate, data)) {
          throw new Error('validate fail');
        }

        const newData = {
            data,
            expire,
            time: new Date().getTime(),
        };
        return engine.setItem(key, JSON.stringify(newData));
    }

    get = () => {
        const { engine, key } = this; 
        
        const res = engine.getItem(key);
        if (!res) {
            return null;
        }
        const { data, time, expire } = JSON.parse(res);
        // 存储永久不过期
        if (expire === null) {
            return data;
        }
        const now = new Date().getTime();
        if (now - time > expire) {
            return null;
        }
        return data;
    }

    remove = () => {
        const { engine , key } = this;

        engine.removeItem(key);
    }
 }

module.exports = Storage;
