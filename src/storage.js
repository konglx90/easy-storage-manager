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
function isFunction(obj){
  return Object.prototype.toString.call(obj)==='object Function'
}
/**
 * Return store Api by use store key
 *
 * Examples:
 *
 *    const userInfoStore =
 *                  generateStorageApi({
 *                     engine: localStorage,
 *                     key: Keys.USER_INFO, 
 *                     defaultMaxAge: 30 * MILLISECONDS_EACH_DAY
 *                  })
 *    userInfoStore.set({name: 'konglingxing'})
 *    const userInfo = userInfoStore.get()
 * @param {Storage} engine
 * @param {String} key
 * @param {Number} space
 * @param {Array} essentialData
 * @param {Number} defaultExpire
 * @param {string} uniqueField 当数据是包含对象的数组时, 用来标识一个数据的身份
 * @return {object}
 */
const generateStorageApi = (
  {
      engine,
      space = '',
      key,
      validate = null,
      defaultMaxAge = null,
  }) => ({
    set: (data, maxAge = defaultMaxAge) => {
        // PropTypes checkPropTypes
        if (isFunction(validate)) {
          // PropTypes.checkPropTypes({ data: validate }, { data }, 'prop', `set storage ${key}`);
          validate(data);
        } else {
          if (validate && !validateEngine(validate, data)) {
            throw new Error('validate fail');
          }
        }

        const newData = {
            data,
            maxAge,
            time: new Date().getTime(),
        };
        // TODO should cache the value of space + key
        return engine.setItem(space + key, JSON.stringify(newData));
    },
    get: () => {
        const res = engine.getItem(space + key);
        if (!res) {
            return null;
        }
        const { data, time, maxAge } = JSON.parse(res);
        // 存储永久不过期
        if (maxAge === null) {
            return data;
        }
        const now = new Date().getTime();
        if (now - time > maxAge) {
            return null;
        }
        return data;
    },
    remove: () => {
        engine.removeItem(key);
    },
});
const withArrayApi = (baseStore, opts) => {
    const {
        defaultExpire = null,
        uniqueField = null,
    } = opts;
    return Object.assign({}, baseStore(opts), {
        // 添加
        push(data, expire = defaultExpire) {
            const oldData = this.get() || [];
            let newData;
            if (Array.isArray(oldData)) {
                newData = [...oldData, data];
            } else {
                newData = [data];
            }
            this.set(newData, expire);
        },
        // 添加 or 去重更新
        update(data, expire = defaultExpire) {
            // 更新操作时需要将旧记录删除并将新记录放在最前面
            const oldData = this.get() || [];
            let newData;
            if (Array.isArray(oldData)) {
                // delete the same item
                const index = findIndexByField(oldData, data, uniqueField);
                if (index >= 0) {
                    oldData.splice(index, 1);
                }
                // add a new one
                newData = [...oldData, data];
            } else {
                newData = [data];
            }
            this.set(newData, expire);
        },
        pop() {
            const oldData = this.get() || [];
            if (!Array.isArray(oldData) || oldData.length === 0) {
                this.remove();
                return;
            }
            const returnItem = oldData.pop();
            const newData = oldData;
            this.set(newData);
            return returnItem;
        },
    });
};
const generateArrayStorageApi = opts => withArrayApi(generateStorageApi, opts)

generateStorageApi.generateArrayStorageApi = generateArrayStorageApi;

module.exports = generateStorageApi;
