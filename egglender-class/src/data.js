import  {calendar}  from './personal.js';//get calendar file
import axios from 'axios';
import React, { Component } from 'react';


const api = axios.create({
  baseURL: `https://5fc7ab11f3c77600165d8a61.mockapi.io/text`
})

export class List extends Component {
	constructor(){
    super();
    api.get('/').then(res => {
      console.log(res.data)
    })
  }
}

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
  var txt = new String(sub+"GMT-0800 (PST)")
  return txt
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



export const data = temp;
console.log(JSON.stringify(data,null,'\t'));//json output

export const locations = ['Europe/London','Asia/Shanghai','Asia/Kolkata', 'America/Los_Angeles'];

