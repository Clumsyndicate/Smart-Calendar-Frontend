# Egglendar

[![Build Status](https://travis-ci.org/Clumsyndicate/Smart-Calendar-Frontend.svg?branch=main)](https://travis-ci.org/Clumsyndicate/Smart-Calendar-Frontend)

Table of contents
  * [Introduction](#introduction)
  * [Technology](#technology)
  * [Install](#install)
  * [User's guide](#guide)
  * [Demo](#demo)

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

## Install
1. Enter the egglenderlogin directory

2. Run the following command to install required packages, if failed you could manually add packages from our package list:
```shell
npm install
```

3. Start the application:
```shell
npm start
```

4. Go to [localhost](http://localhost:3000) for further operation
    
## Guide
1. Sign up and Log in 

2. Go to the setting's page to fill out enrolled class and contact information

3. Upload .ics Calender data (there are two sample file at the uploading window)

4. Other features to exlore:

   - Change time-zone and view
   
   - Add extra classes in search box
   
   - double click empty slot to add events, single click existing events to modify events
   
   - Scroll the application to the bottom to find potential class mates

5. Remember to save any changes before log out!


## Demo
Video demo: [Google Drive](https://drive.google.com/file/d/1_t6Gnqz54lKaGFfyz4KL6iMkViSJuwAr/view?usp=sharing)

Picture demo:
![](https://github.com/Clumsyndicate/Smart-Calendar-Frontend/blob/main/egglenderlogin/src/calendar-layout/Demo.png)
