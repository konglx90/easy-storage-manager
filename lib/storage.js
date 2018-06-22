'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateEngine = require('@konglx/data-validate');

var fieldEqual = function fieldEqual(a, b, field) {
    if (!a || !b) {
        return false;
    }
    if (!a[field] || !a[field]) {
        return false;
    }
    return a[field] === b[field];
};
var findIndexByField = function findIndexByField(arr, obj, field) {
    return arr.reduce(function (acc, cur, index) {
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

var Storage = function Storage(_ref) {
    var engine = _ref.engine,
        key = _ref.key,
        validate = _ref.validate,
        defaultExpire = _ref.defaultExpire;

    _classCallCheck(this, Storage);

    _initialiseProps.call(this);

    this.engine = engine;
    this.key = key;
    this.validate = validate;
    this.defaultExpire = defaultExpire;
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.engine = null;
    this.key = null;
    this.validate = null;
    this.defaultExpire = null;

    this.set = function (data) {
        var expire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.defaultExpire;
        var key = _this.key,
            validate = _this.validate,
            engine = _this.engine;

        // validate essential data
        // 非严格限制
        // PropTypes.checkPropTypes({ data: validate }, { data }, 'prop', `set storage ${key}`);

        if (!validateEngine(validate, data)) {
            throw new Error('validate fail');
        }

        var newData = {
            data: data,
            expire: expire,
            time: new Date().getTime()
        };
        return engine.setItem(key, JSON.stringify(newData));
    };

    this.get = function () {
        var engine = _this.engine,
            key = _this.key;


        var res = engine.getItem(key);
        if (!res) {
            return null;
        }

        var _JSON$parse = JSON.parse(res),
            data = _JSON$parse.data,
            time = _JSON$parse.time,
            expire = _JSON$parse.expire;
        // 存储永久不过期


        if (expire === null) {
            return data;
        }
        var now = new Date().getTime();
        if (now - time > expire) {
            return null;
        }
        return data;
    };

    this.remove = function () {
        var engine = _this.engine,
            key = _this.key;


        engine.removeItem(key);
    };
};

module.exports = Storage;