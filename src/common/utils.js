let humanTimestamp = (timestamp = null) => {
  if (timestamp == null) {
    timestamp = Date.now();
  }
  let date = new Date(timestamp);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + (month + 1);
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour + 8;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};

let assignOption = (ops1, ops2) => {
  let ops = Object.assign({}, ops1, ops2);
  let keys = Object.keys(ops1);

  keys.forEach((item) => {
    if (typeof ops1[item] === "object" && !Array.isArray(ops1[item])) {
      ops[item] = Object.assign({}, ops1[item], ops2[item] || {});
    }
  });
  return ops;
};

module.exports = { humanTimestamp, assignOption };
