const api = require("./api");
const message = require("../common/message/message");

module.exports = async () => {
  message("FastFrog 签到通知:");
  const msg = await api.checkin();
  message(msg);
};
