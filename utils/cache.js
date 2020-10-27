const redis = require("redis");
const {
  CACHE_SERVER_IP,
  CACHE_SERVER_PORT,
  SINGER_CACHE_KEY,
} = require("./constants");

let client = redis.createClient({
  host: CACHE_SERVER_IP,
  port: CACHE_SERVER_PORT,
});

const redisOperations = {
  setData: (key, jsonString) => {
    client.set(key, jsonString);
  },

  getData: (key) => {
    const promise = new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result) {
            resolve(result);
          } else {
            reject("No data found in cache with this key," + key);
          }
        }
      });
    });
    return promise;
  },

  checkAndFetchFromCache: (req, res, next) => {
    if (req.url.endsWith("/singers")) {
      const promise = redisOperations.getData(SINGER_CACHE_KEY);
      promise
        .then((result) => {
          console.log("DATA COMING FROM CACHE");
          res.json(JSON.parse(result));
        })
        .catch((err) => {
          console.log("DATA NOT COMING FROM CACHE");
          next();
        });
    }
  },
};

module.exports = redisOperations;
