const storage = require('./lib/storage');
const ArrayStorage = require('./lib/arrayStorage');

storage.ArrayStorage = ArrayStorage;
module.exports = storage;