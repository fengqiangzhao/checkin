const juejin = require("./juejin/index");
const fastfrog = require("./fastfrog/index");
const message = require("./common/message/message");

if (process.argv.length === 2) {
  message("Expected a argument like: juejin ...");
  process.exit(1);
}

let project = process.argv[2];

switch (project) {
  case "juejin":
    juejin();
    break;
  case "fastfrog":
    fastfrog();
    break;
  default:
    message(`Unsupport porject: ${project}`);
}
