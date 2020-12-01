import  {calendar}  from './personal.js';
console.log(calendar);
function convert(str){
	var ret = str
	if(ret.indexOf("DTSTART") !== -1){
		var temp = ret.match(/.+?(?=;DTSTART)/);
		ret = temp[0];
  }
	return ret;
}


const raw = calendar;
const ical = require("ical");
const data1 = ical.parseICS(raw);
var temp = [];

for (let k in data1) {
  if (data1.hasOwnProperty(k)) {
    var ev = data1[k];
    if (data1[k].type === "VEVENT") {
      var event = ev.summary;
      var start = ev.start;
      var end = ev.end;
      if(ev.rrule !== undefined){
        var rrule = convert(ev.rrule.toString());
      var url = "null";
      if(ev.url !== undefined){
      url = ev.url;
      }
      ;}

      temp.push({
        text: event,
        startDate: start,
        endDate: end,
        id: 1,
        location: url,
        recurrenceRule: rrule
      });
    }
  }
}

export const data = temp;

export const locations = ['Europe/London','Asia/Shanghai','Asia/Kolkata', 'America/Los_Angeles'];
