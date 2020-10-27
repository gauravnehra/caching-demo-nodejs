const express = require("express");
const route = express.Router();
const apiCall = require("../utils/apicall");
const { SINGER_URL, SINGER_CACHE_KEY } = require("../utils/constants");
const redisOperations = require("../utils/cache");

route.use(redisOperations.checkAndFetchFromCache);

route.get("/singers", (req, res) => {
  // first time get the singers data, then cache it
  console.log("API CALL FROM ROUTE");
  const promise = apiCall(SINGER_URL);
  promise
    .then((data) => {
      data
        .json()
        .then((jsondata) => {
          redisOperations.setData(SINGER_CACHE_KEY, JSON.stringify(jsondata));
          res.json(jsondata);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = route;
