const message = require("../common/message/message");
const Request = require("../common/request");
const config = require("../../config/juejin");

const HOST = "https://api.juejin.cn";
const API = {
  checkin: "/growth_api/v1/check_in", //签到
  hadCheckin: "/growth_api/v1/get_today_status", //今日是否签到
  lottery: "/growth_api/v1/lottery/draw", //抽奖
  hadFreeLottery: "/growth_api/v1/lottery_config/get", //查看是否有免费抽奖机会
  dipLuckyList: "/growth_api/v1/lottery_history/global_big", //查看中奖列表沾喜气
  dipLucky: "/growth_api/v1/lottery_lucky/dip_lucky" //沾喜气
};

const request = (options) => {
  options.headers = {
    cookie: config.COOKIE,
    origin: "https://juejin.cn",
    referer: "https://juejin.cn/"
  };

  return Request(options).then((res) => {
    let data = res.data || {};
    if (data.err_no === 0) {
      return data.data;
    } else {
      message(data.err_msg);
      throw new Error(`Error: ${data.err_msg}`);
    }
  });
};

// 检查今日是否签到
const hadCheckIn = () => {
  return request({
    url: HOST + API.hadCheckin,
    method: "GET"
  });
};

// 签到
const checkin = () => {
  return request({
    url: HOST + API.checkin,
    method: "POST"
  });
};

// 检查今日是否免费抽奖
const hadFreeLottery = () => {
  return request({
    url: HOST + API.hadFreeLottery,
    method: "GET"
  });
};

// 抽奖
const lottery = () => {
  return request({
    url: HOST + API.lottery,
    method: "POST"
  });
};

// 获取沾喜气列表
const getDipLuckyList = () => {
  return request({
    url: HOST + API.dipLuckyList,
    method: "POST",
    data: { page_no: 1, page_size: 5 }
  });
};

// 沾喜气
const dipLucky = (id) => {
  return request({
    url: HOST + API.dipLucky,
    method: "POST",
    data: { lottery_history_id: id }
  });
};

module.exports = { hadCheckIn, checkin, hadFreeLottery, lottery, getDipLuckyList, dipLucky };
