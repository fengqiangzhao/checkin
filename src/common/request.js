const axios = require("axios");
const message = require("./message/message");
const { assignOption } = require("./utils");

const defaultOptions = {
  method: "GET",
  data: {},
  params: {},
  headers: {
    origin: "https://juejin.cn",
    pragma: "no-cache",
    referer: "https://juejin.cn/",
    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    "content-type": "application/json"
  }
};

const Request = (options) => {
  return new Promise((resolve, reject) => {
    axios(assignOption(defaultOptions, options))
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        message(err.message);
        reject(err);
      });
  });
};

module.exports = Request;
