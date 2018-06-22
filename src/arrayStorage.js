const Storage = require('./storage');

class ArrayStorage extends Storage {
    // 添加
    push(data, expire = this.defaultExpire) {
        const oldData = this.get() || [];
        let newData;
        if (Array.isArray(oldData)) {
            newData = [...oldData, data];
        } else {
            newData = [data];
        }
        this.set(newData, expire);
    }
}

module.exports = ArrayStorage;