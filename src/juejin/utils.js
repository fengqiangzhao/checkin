const message = require("../common/message/message");

let juejinMessage = (msg) => {
  message(`掘金签到通知: ${msg}`);
};

module.exports = { juejinMessage };
