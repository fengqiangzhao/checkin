const api = require("./api");
const { juejinMessage } = require("./utils");

let dipLucky = async () => {
  const randomNumber = Math.floor(Math.random() * 5);
  const { lotteries } = await api.getDipLuckyList();
  const dipLuckyId = lotteries?.[randomNumber]?.history_id ?? 0;
  const { has_dip, dip_action, total_value } = await api.dipLucky(dipLuckyId);
  const beamingValue = `当前喜气值: ${total_value}`;
  if (has_dip) return `今日已沾过喜气, ${beamingValue}`;
  if (dip_action === 1) return `沾喜气成功! ${beamingValue}`;
  return `沾喜气失败！${beamingValue}`;
};

module.exports = async () => {
  const today_status = await api.hadCheckIn();
  if (today_status) {
    juejinMessage("今日已签到");
  } else {
    const { sum_point } = await api.checkin();
    juejinMessage(`签到成功! 当前积分: ${sum_point}`);
  }

  const { free_count } = await api.hadFreeLottery();
  if (free_count === 0) {
    juejinMessage("今日已经免费抽奖");
  } else {
    const { lottery_name } = await api.lottery();
    juejinMessage(`抽奖成功! 获得: ${lottery_name}`);
  }

  let dipMsg = await dipLucky();
  juejinMessage(dipMsg);
};
