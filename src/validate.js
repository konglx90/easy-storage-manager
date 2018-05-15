const isEmpty = o => o === null || o === undefined;
const classOf = (o) => {
    if (o === null) { return 'null'; }
    if (o === undefined) { return 'undefined'; }
    return Object.prototype.toString.call(o).slice(8, -1).toLocaleLowerCase();
}
const includes = (array, item) => {
    if (array.includes) {
        return array.includes(item);
    }

    return array.indexOf(item) > -1;
}
// this validate just support basic validate
const validateEngine = (validate, data) => {
    if (isEmpty(validate)) return false;

    if (classOf(validate) === 'string') {
        // handle or type 'string|number'
        if (!includes(validate.split('|'), classOf(data))) {
            // console.trace(`need data is ${validate} in generateCacheApi`);
            return false;
        }
        return true;
    }

    if (classOf(validate) === 'array') {
        if (classOf(data) !== 'array') {
            // console.trace('data must be a array in generateCacheApi');
            return false;
        }

        if (validate.length > 0) {
          return data.every(d => validateEngine(validate[0], d));
        } else {
          // empty Array
          return classOf(data) === 'array';
        }
    }

    const validateObjKeys = Object.keys(validate);
    // empty object
    if (validateObjKeys.length === 0) {
      return classOf(data) === 'object';
    }

    return Object.keys(validate).every((key) => {
        return validateEngine(validate[key], data[key]);
    });
};

module.exports = {
    validateEngine
};
