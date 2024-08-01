const Clock = require("./Clock");
const commands = require("./Commands");
const readline = require("readline");

const { CREATE_ALARM, DELETE_ALARM, DISPLAY_TIME } = commands;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const clock = new Clock(rl);

function processInput(args) {
  const cmd = args[0];
  const cmdList = Object.entries(commands).map(([key, value]) => value);

  if (!cmdList.includes(cmd)) {
    console.error("Invalid argument");
    process.exit();
  }
  switch (cmd) {
    case DISPLAY_TIME:
      clock.displayTime();
      break;
    case CREATE_ALARM:
      const time = args[1];
      const day = args[2];
      clock.createAlarm(time, day);
      break;
    case DELETE_ALARM:
      const id = args[1];
      console.log("id is: ", id);
      clock.deleteAlarm(id);
      break;
    default:
      console.error("Invalid Command");
      process.exit();
  }
  rl.question("New Command  : ", (input) => {
    processInput(input.split(" "));
    // rl.close();
  });
}

if (process.argv.length > 2) {
  const args = process.argv.slice(2);
  processInput(args);
  return;
} else {
  console.log("Welcome to Alarm Clock Test 2024");
  console.log(
    `${CREATE_ALARM} [time HH:MM] [Day of week (0-6)] : Creates Alarm Clock for this time and day`
  );
  console.log(`${DELETE_ALARM} [id] : Deletes Alarm clock`);
  console.log(`${DISPLAY_TIME}  : Displays Time`);
  rl.question("", (input) => {
    processInput(input.split(" "));
    // rl.close();
  });
}
