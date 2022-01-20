const juejin = require("./juejin/index");

if (process.argv.length === 2) {
  console.error("Expected a argument like: juejin ...");
  process.exit(1);
}

let project = process.argv[2];

switch (project) {
  case "juejin":
    juejin();
}
