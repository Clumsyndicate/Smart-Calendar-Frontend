import {calendar} from './personal.js';
// console.log(calendar);

import {
  pink, purple, teal, amber, deepOrange,
} from '@material-ui/core/colors';

export const resourcesData = [
  {
    text: 'Room 101',
    id: 1,
    color: amber,
  }, {
    text: 'Room 102',
    id: 2,
    color: pink,
  }, {
    text: 'Room 103',
    id: 3,
    color: purple,
  }, {
    text: 'Room 104',
    id: 4,
    color: deepOrange,
  }, {
    text: 'Room 105',
    id: 5,
    color: teal,
  },
];

function convert(str){
	var ret = str
	if(ret.indexOf("DTSTART") !== -1){
		var temp = ret.match(/.+?(?=;DTSTART)/);
		ret = temp[0];
  }
	return ret;
}

function timezone(str){
  var newstr = new String(str);
  var sub = newstr.substring(0, 25);
  var txt = new String(sub+"GMT-0800 (PST)");
  return txt;
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
      var start = timezone(ev.start);
      var end = timezone(ev.end);
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
// console.log(temp);
export const data = temp;

export const locations = ['Europe/London','Asia/Shanghai','Asia/Kolkata', 'America/Los_Angeles'];
