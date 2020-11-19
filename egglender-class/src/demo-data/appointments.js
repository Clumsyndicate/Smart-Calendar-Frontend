import raw from "../personal.ics";
const ical = require("ical");
const data = ical.parseICS(raw);
var temp = [];

for (let k in data) {
  if (data.hasOwnProperty(k)) {
    var ev = data[k];
    if (data[k].type == "VEVENT") {
      var event = ev.summary;
      var start = ev.start;
      var end = ev.end;
      temp.push({
        title: event,
        startDate: start,
        endDate: end,
        id: 1,
        location: "Room 1"
      });
    }
  }
  console.log(temp);
}

export const appointments = temp;
