const axios = require("axios");
const crypto = require("crypto");
const { humanTimestamp } = require("../utils");

class FeishuBot {
  constructor(options = {}) {
    this.text = "";
    this.webhook = options.webhook;
    this.secret = options.secret;
    this.timestamp = ~~(Date.now() / 1000);
    this.sign = this.signFn(`${this.timestamp}\n${this.secret}`);
  }
  signFn(content) {
    // 加签
    return (
      crypto
        // 加密一次即可
        .createHmac("sha256", content)
        .digest()
        .toString("base64")
    );
  }

  send(data) {
    let p;
    if (!this.webhook || !this.secret) {
      p = Promise.resolve({ errcode: -1, errmsg: "webhook or secret is empty" });
    } else {
      p = axios({
        url: this.webhook,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      });
    }
    return p;
  }

  sendText(message) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.text += `${humanTimestamp()} ${message} \n`;
    this.timer = setTimeout(() => {
      this.send({
        timestamp: this.timestamp,
        sign: this.sign,
        msg_type: "text",
        content: {
          text: this.text
        }
      }).then(() => {
        this.text = "";
      });
    }, 2000);
  }
}

module.exports = FeishuBot;
