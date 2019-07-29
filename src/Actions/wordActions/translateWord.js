const axios = require('axios').default;
const translateWordFactory = require('./translateWord.factory');

const deps = { axios };

module.exports = translateWordFactory(deps);
