const FeishuBot = require("./feishubot");
const config = require("../../../config/feishubot");

const feishuBot = new FeishuBot({
  webhook: config.FEISHUBOT_WEBHOOK,
  secret: config.FEISHUBOT_SECRET
});

module.exports = function message(msg) {
  console.log(msg);
  feishuBot.sendText(msg);
};
