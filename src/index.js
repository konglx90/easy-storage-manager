const validateEngine = require('./validate').validateEngine;

/**
 * Return cache Api by use store key
 *
 * Examples:
 *
 *    const userInfoCache = generateCacheApi(localStorage, Keys.USER_INFO, 30 * MILLISECONDS_EACH_DAY)
 *    userInfoCache.set({name: 'konglingxing'})
 *    const userInfo = userInfoCache.get()
 * @param {Storage} engine
 * @param {String} key
 * @param {Array} essentialData
 * @param {Number} defaultExpire if defaultExpire is null, the cache will never expire
 * @return {object}
 */
const generateCacheApi = (
    {
        engine,
        key,
        validate = null,
        defaultExpire = 7 * 24 * 3600 * 1000,
    },
) => ({
    set: (data, expire = defaultExpire) => {
        // validate essential data
        // 不严格限制, 不符合的数据是以 console.warn()抛出
        validateEngine(validate, data);

        const newData = {
            data,
            expire,
            time: new Date().getTime(),
        };
        return engine.setItem(key, JSON.stringify(newData));
    },
    get: () => {
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
    },
});

export default generateCacheApi;
