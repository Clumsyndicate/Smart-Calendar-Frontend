import {calendar} from './personal.js';

import axios from 'axios';
import React, { Component } from 'react';


const api = axios.create({
  baseURL: `https://5fc9fe933c1c22001644175c.mockapi.io/events`
})


function convert(str){
	var ret = str
	if(ret.indexOf("DTSTART") !== -1){
		var temp = ret.match(/.+?(?=;DTSTART)/);
		ret = temp[0];
  }
	return ret;
}

function timezone(str){
  console.log("this is the original: "+str);
  var newstr = str.toString();
  var sub = newstr.substring(0, 25);
  var txt = (sub+"GMT-0800 (PST)").toString();
  console.log("this is the final: "+txt);
  return txt;
}

function get_data(){
  // parse the calendar data from ical file
  const raw = calendar;
  const ical = require("ical");
  const cal_data = ical.parseICS(raw);
  var temp = [];
  var i = 0;

  // iteratively store each event data into an element of temp
  for (let k in cal_data) {
    if (cal_data.hasOwnProperty(k)) {
      var ev = cal_data[k];
      if (cal_data[k].type === "VEVENT") {
        i++;
        var event = ev.summary;
        var start = timezone(ev.start);
        var end = timezone(ev.end);
        if(ev.rrule !== undefined){
          var rrule = convert(ev.rrule.toString());
          var url = "null";
          if(ev.url !== undefined){
            url = ev.url;
          }
        }
        // push in events
        temp.push({
          text: event,
          startDate: start,
          endDate: end,
          id: i,
          location: url,
          recurrenceRule: rrule
        });
      }
    }
  }
  // console.log(temp.length);
  // // post the data onto the backend
  // for (var j = 0; j < temp.length; ++j)
  // {
  //   try {
  //     const response = api.post('https://5fc9fe933c1c22001644175c.mockapi.io/events', temp[j]);
  //     console.log('👉 Returned data:', response);
  //   } catch (e) {
  //     console.log(`😱 Axios request failed: ${e}`);
  //   }
  // }
  return temp;
}



export const data = get_data();

export const locations = ['Europe/London','Asia/Shanghai','Asia/Kolkata', 'America/Los_Angeles'];
