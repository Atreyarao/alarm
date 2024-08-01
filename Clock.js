const Alarm = require("./Alarm");

module.exports = class Clock {
  alarms = [];


  displayTime() {
    const now = new Date();
    console.log("Time Is : ", now.getHours(), ":", now.getMinutes());
  }
  createAlarm(time, dayOfWeek) {
    if (time === undefined || dayOfWeek === undefined) {
      console.error("Invalid Argument for create alarm");
      return;
    }
    let [hrs, min] = time.split(":");
    if (hrs === undefined || min === undefined) {
      console.log("Invalid input [Time]");
      return;
    }
    hrs = parseInt(hrs, 10);
    min = parseInt(min, 10);
    if (hrs < 0 || hrs > 23) {
      console.log("Invalid Input [hrs]");
      return;
    }

    if (min < 0 || min > 59) {
      console.log("Invalid Input [min]");
      return;
    }
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      console.log("Invalid Input [Day]");
      return;
    }
    const len = this.alarms.length + 1;
    const alarm = new Alarm(time, dayOfWeek);

    this.alarms.push(alarm);

    console.log("Alarm create with id: ", len, " ");
  }
  deleteAlarm(id) {
    if (id === undefined || parseInt(id) === NaN) {
      console.log("ID not given");
      return;
    }
    id = parseInt(id);
    const alarms = this.alarms;

    const alarm = alarms[id - 1];

    if (!alarm) {
      console.log("Invalid ID");
      return;
    }
    alarm.deleteAlarm();
    alarms.splice(id - 1, 1);
    this.alarms = [...alarms];
    console.log("Alarm deleted successfully");
  }
};
