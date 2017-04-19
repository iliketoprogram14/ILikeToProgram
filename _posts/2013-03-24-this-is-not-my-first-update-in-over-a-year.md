---
layout: post
title: This is not my first update in over a year...
date: 2013-03-24
tags: [website, plans, school]
image: https://raw.githubusercontent.com/iliketoprogram14/ArduinoCar/master/assets/xbeecar.jpg
image_alt: Kinect-controlled Arduino car
image_caption: An Arduino car controlled by a Kinect
description: I've included a bunch of new projects, including a Kinect-controlled Arduino car written in C#; a distributed task list implemented in Django, a python framework; a morse code instant messaging hardware project, implemented in Verilog; and a parallel image segmentation project implemented in python using NVIDIA's CUDA.
---

So I finally sucked it up and purchased permanent hosting for this site a few months ago. The free hosting I was using would completely drop my site every other month if it didn't get at least a certain number of views; this meant that every few months I would have to FTP my entire site plus a backup of the database back to the host. Of course, I totally forgot to make backups/make a script to back up my database, so I lost around 5 posts from over the summer :(

A lot has happened in the past year, and I've updated the [about section](/about.html) accordingly. I interned at Microsoft with the Windows team over the summer, and I accepted an offer to come back this coming fall. I'm seriously geeked at the prospect of working on the Windows kernel. In the mean time, I've taken a lot more CS courses (7 courses, plus the ones I teach), and I feel like I'm a slightly better programmer compared to the guy who made the last post on this website :P

<!--more-->

I took a couple days over spring break (which I'm currently at the end of) to update this site quite a bit. First, a friend of mine pointed out that I had a SQL injection vulnerability since I wasn't escaping anything but strings (!). I had completely ignored security when building my website initially, and I totally forgot to come back to it by now. I patched things up, rewrote and refactored a lot of the back end (which I use for uploading posts/projects), and spruced up the readability of the code quite a bit.

After that, I changed up the font from [Georgia Sans-Serif](http://en.wikipedia.org/wiki/Georgia_(typeface)){:target="_blank"} to Segoe UI, which you should be able to see now if you're on a relatively modern computer. Doing that and adding some spacing between lines made the page a lot cleaner and more readable, and the site doesn't look *that* bad anymore. I still need to fix the color scheme though :P

I also added four projects I've done over the past year to the [projects page](/projects.html):

- [A Kinect-controlled Arduino car]({{ site.data.projects['kinectarduinocar'].url }}) (my favorite)
- [A distributed task list]({{ site.data.projects['distributedtasklist'].url }})
- [Morse code instant messaging]({{ site.data.projects['morsecodeim'].url }} (Yes, it's just as crazy as it sounds)
- [Parallel image segmentation]({{ site.data.projects['parallelimage'].url }})

I also started a Windows 8 app for the Harvard shuttle system during one October weekend, and I'm off to try to finish that off before Monday. In the mean time, here are some videos of the above projects I made!

<p><iframe width="100%" height="480" src="http://www.youtube.com/embed/4v98L51F9Vw" frameborder="0" allowfullscreen></iframe></p>

<p><iframe width="100%" height="480" src="http://www.youtube.com/embed/PY2Q4gfPRhg" frameborder="0" allowfullscreen></iframe></p>

<p><iframe width="100%" height="480" src="http://www.youtube.com/embed/911IuZZBjJY" frameborder="0" allowfullscreen></iframe></p>