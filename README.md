# Smart-Calendar

[![Build Status](https://travis-ci.org/Clumsyndicate/Smart-Calendar-Frontend.svg?branch=main)](https://travis-ci.org/Clumsyndicate/Smart-Calendar-Frontend)

## Introduction

The inspiration for our smart calendar comes from dealing with time zone craziness and jumbled up schedules for UCLA international students during the COVID-19 pandemic. Despite efforts to make studying fairer for domestic and international students alike, the domestic timezone still takes precedence. As a group of international students, we have identified a number of pains that we aim to tackle with our product. 

Pains:
 - Convoluted deadlines & misleading dates
 - Confusing timezones + Daylight saving 
 - Hard to socialize with classmates, hard to find study-mates. (Exacerbated by midnight dicussion sections)

To deal with these problems, we are introducing the following features:
 - Automatic timezone adaption for users.
 - Direct translation of class schedule from [Study List calendar data](https://be.my.ucla.edu/studylist.aspx) in .ics form
 - Cloud sync of all events
 - Intelligent deadline management, day-shift and midnight warnings. 
 - If willing, the application will introduce students with similar schedules as study-mates.

## Technology 

This repository holds the frontend code. [Backend is here](https://github.com/Clumsyndicate/Smart-Calendar-backend)

The frontend application is built with React.

## Class scheduling and class adding part
[link to this repository](https://github.com/Clumsyndicate/Smart-Calendar-Frontend/blob/main/egglender-class)

Interactive online react IDE: [Codesandbox](https://codesandbox.io/s/ucla-class-scheduler-v2-gp43m)

Demo screenshot:
![](https://github.com/Clumsyndicate/Smart-Calendar-Frontend/raw/main/egglender-class/Screenshot/Demo_v2.png)
