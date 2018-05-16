const axios = require('axios');

const fetch = url =>
  new Promise((resolve, reject) => {
    return axios.get(url).then(response => resolve(response.data));
  });

module.exports = fetch;
