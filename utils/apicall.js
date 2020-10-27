const fetch = require("node-fetch");
// node-fetch when you only have to fetch data

function getDataFromNetwork(url) {
  return fetch(url);
}

module.exports = getDataFromNetwork;
