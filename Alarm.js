const readline = require("readline");

const minutes_5 = 1000 * 60 * 5;
const days = 1000 * 60 * 60 * 24;

module.exports = class Alarm {
  timeOut;
  snoozed = 0;

  constructor(time, dayOfWeek) {
    this.time = time;

    this.dayOfWeek = dayOfWeek;
    const triggerTime = this.getNextTriggerTime(time, dayOfWeek);
    console.log("trigger time: ", triggerTime);
    this.timeOut = setInterval(this.ring, triggerTime);
  }

  ring() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Alarm Triggered. Press 'Z' to snooze or 'C' to close: ", (answer) => {
      const char = answer.toLowerCase();
      if (char === "z") {
        if (this.snoozed > 2) {
          console.log("Alarm Cannot be snoozed again");
          return;
        }
        console.log("Snoozed! Alarm will trigger again in 5 minutes.");

        setTimeout(() => {
          this.ring();
        }, minutes_5);
      } else {
        console.log("Invalid input. No action taken.");
      }
    });
  }

  getNextTriggerTime(time, dayOfWeek) {
    const [hrs, min] = time.split(":").map(Number);
    const now = new Date();
    const today = now.getDay();
    const currentHrs = now.getHours();
    const currentMin = now.getMinutes();

    let daysUntilNextTrigger;

    if (today < dayOfWeek) {
      daysUntilNextTrigger = dayOfWeek - today;
    } else if (today > dayOfWeek) {
      daysUntilNextTrigger = 7 - (today - dayOfWeek);
    } else {
      if (currentHrs < hrs || (currentHrs === hrs && currentMin < min)) {
        // today but later time
        daysUntilNextTrigger = 0;
      } else {
        daysUntilNextTrigger = 7;
      }
    }

    const nextTriggerDate = new Date(now);
    nextTriggerDate.setDate(now.getDate() + daysUntilNextTrigger);
    nextTriggerDate.setHours(hrs);
    nextTriggerDate.setMinutes(min);
    nextTriggerDate.setSeconds(0);
    nextTriggerDate.setMilliseconds(0);

    return nextTriggerDate.getTime() - now;
  }
  deleteAlarm() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      clearInterval(this.timeOut);
    }
  }
};
