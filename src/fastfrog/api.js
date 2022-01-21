const message = require("../common/message/message");
const Request = require("../common/request");
const config = require("../../config/fastfrog");

const HOST = "https://m.ok4.icu/api_mweb";
const API = {
  checkin: "/user/checkin" //签到
};

const request = (options) => {
  options.headers = {
    authorizationmweb: config.TOKEN,
    origin: "https://m.ok4.icu",
    referer: "https://m.ok4.icu/m/home"
  };

  return Request(options)
    .then((res) => {
      let data = res.data || {};
      if (data.code === 100) {
        return data.data.message;
      } else if (data.code === 10) {
        return data.message;
      } else {
        throw new Error(`Error: ${data.message}`);
      }
    })
    .catch((err) => {
      throw new Error(`Error: ${err.message}`);
    });
};

// 签到
const checkin = () => {
  return request({
    url: HOST + API.checkin,
    method: "PUT"
  }).catch((err) => {
    message(`签到失败: ${err.message}`);
    throw new Error(`Error: ${err.message}`);
  });
};

module.exports = { checkin };
