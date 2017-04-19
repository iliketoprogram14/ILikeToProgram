---
layout: post
title: The sad state of shuttles at Harvard
date: 2013-04-11
tags: [harvard, fails, shuttle]
image: https://raw.githubusercontent.com/iliketoprogram14/HarvardShuttle/master/assets/splash.png
image_alt: Harvard Shuttle
image_caption: A Windows 8 app for shuttles around Harvard
description: I released a Windows 8 'metro' app for Harvard shuttles, since the existing tools for using the shuttles are lackluster, plus I wanted to try making a Windows modern app in C#.
---

It's April 2013, and there's still not a great experience at Harvard for a simple task: finding a shuttle time that's relevant to you. As far as I know, students on a laptop/desktop computer can find a shuttle time via one of the following ways:

- Go to the [official shuttle tracking website](http://shuttle.harvard.edu){:target="_blank"}, which will display a map with a bunch of routes and moving shuttles
- Go to [Shuttleboy](http://shuttleboy.cs50.net/){:target="_blank"}, which has an awesome interface but whose times were up until about a week or two ago, **wrong** for the 2012-2013 year.

I think that the official shuttle tracking tool is awful because it does not give users the information they want quickly, and (sadly) Shuttleboy was not usable (until just recently) because the times were actually wrong (trust me, this app I made originally depended on the Shuttleboy API, but when I tried integrating it with the official tool's API, times were definitely off; it looks like they recently fixed them, as I just checked while writing this post haha). So, what should a good shuttle app do?

<!--more-->

I think it should enable the following tasks:

1. Find "trips", which I define as a trip from point A to point B.
2. Quickly determine how long (i.e., how many minutes) until the next shuttle for their trip departs.
3. Quickly determine future shuttle departures for a trip.

These three things, I think, are the most common tasks that users want to accomplish when they open up their favorite shuttle tool.

Task 1 is important because, well, it's inherent to the problem itself. If I'm in the Quad, and I want to get Lamont, I should be able to let the tool know so that it can give me the relevant information. Virtually every maps service does this in the form of directions: Google Maps, Ask Jeeves Maps, etc. Shuttleboy does this really well on their web page, and I honestly wouldn't have started making this app if it had had the correct schedule since the beginning of the year.

The official shuttle tool though, **really** screws this up. In order to accomplish this task, a user must find locate their origin and destination on the map and find a colored line that passes through both of them. If no such line exists, then there is no shuttle currently running between those two points, although there could be in the future. You can also try to sift through the official Harvard shuttle schedules (there's no direct link to them; you need to hit "Schedules" on the tool and then hit "Shuttle Schedule" and then another time category to find some of them). To figure out if there's a route between points A and B, users must select the time range that they want to find the time for, sift through the 3 or 4 routes within the time range to determine which routes have both points A and B, and the given route always stops at points A and B (River Houses A-B-C is a great example where some stops are not always on a route). In other words, the official Harvard solution fails.

Task 2 is a no-brainer: students use shuttle apps because they want to know "when the next shuttle is coming". I would argue that enabling Task 1 makes solving Task 2 a lot easier for the user; the design of Shuttleboy proves this claim right. On the official tool, users can find a countdown of when the next shuttle arrives by clicking on the origin of their trip, or by visually tracking shuttle pins on a map approaching or leaving their origin. I think that a concrete countdown is the quickest way of accomplishing task 2, but a map representation of real-time shuttle locations is useful when determining if a shuttle is early or late. The tool is great with the map, but not that great for the countdown since its meaning depends on Task 1. Shuttleboy, on the other hand, is awesome for finding a countdown for a trip, but doesn't support real-time tracking of shuttles, making it impossible to figure out how late shuttles are.

Task 3 is for a pretty common scenario that Shuttleboy handles beautifully: when does the next shuttle come 1 hour from now?  Again, the official tool cannot answer this without requiring the user to find the horrible schedules and then banging his/her head against their monitor. This is where my app comes in.

I made [Harvard Shuttle]({{ site.data.projects['harvardshuttle'].url }} to solve these 3 most common tasks. There are a few apps out there on different platforms that are copies of the tool, but not very many *working* copies of Shuttleboy, which does a reasonable job at enabling the above 3 tasks. The reason why there are so many copies of the tool and so few of Shuttleboy is because the shuttle schedule data is not easy to access.

Right now, the only API or easily accessible form of shuttle data is [the Transloc API](https://market.mashape.com/transloc/openapi-1-2){:target="_blank"} which is the service that's responsible for tracking the shuttles. Developers can query the API for currently running routes, vehicles, and arrival-estimates. However, there's no support for schedules; the API only reveals arrival estimates for the next 10 minutes of shuttles, and the routes resource doesn't even list all possible routes. In other words, this API is built for apps that are exactly like the shuttle tool: tools that display the real-time location of a shuttle on a colored route on a map, and that's it. This is useful for partially solving Task 2, but not helpful for every other task.

This wouldn't be that big of a deal if the schedules were well organized.

But they're not. They sometimes don't even match the API results.

Scraping the schedule isn't too bad, but there does not exist a nice way to parse the schedule. Currently, my parser is unnecessarily complicated, mostly due to the many exceptions in the tables and the lack of consistency across routes. A not-that-quick example is the "Morning & Afternoon, Monday-Friday" page. The first route (Allston Campus Express) isn't that bad, but there's a few cells of text in there and a few half-empty rows, which is kind of annoying to handle, but not that big of a deal. Mather Express uses vertical pipes to show that buses depart every 10 minutes starting at 8:20am until 3pm, but that's indicated in English, and neither the end nor start of those trips is listed in the table. The vertical pipe notation is used for the Quad Express route as well, but it actually lists the first two times that are part of the 10-minute-repeating-routes, whereas there were no times part of the 10-minute-repeating-routes for Mather Express.

Additionally, there's a stop called "Quad Mass Ave" in the Quad Express route, and there's a "Quad" stop in the Quad Stadium Route, but they're actually the same stop; there's also a "Garden St" stop in Quad Stadium that differs from the "Mass Ave Garden St" stop in Quad Express, but they're actually the same thing too. There's also the two dangling times at the end of Quad Stadium which we know nothing about. They're basically trips with 1 stop and that's it.

And this is just one page.

Why does Harvard even expose all this data to students?Why not just wrap the data up into some easy-to-use application which accomplishes the three tasks outlined above?I don't know, but it's definitely a really stupid, trivial problem that wastes a lot more of our time than it should, and is honestly easily fixable. Ultimately, this is one of the primary reasons why I made Harvard Shuttle: to show how much more effective a dinky app like mine can be than their official tool. I don't think too many students will  use this app because of the platform (although I do plan on porting the app to Windows Phone, where all the users are lol).

Here's how my app accomplishes the three tasks:

1. The app is centered around finding trips between two points. Even better, users can store frequently accessed trips.
2. The Trip Results screen clearly shows in huge font how many minutes until the shuttle is scheduled to depart, as well as both a map and a countdown for the actual location of shuttles that are on the routes for your selected trip only (thereby filtering out other shuttles that don't matter to your trip). Even better, the app's live tile shows a countdown for the next shuttle departure of your last trip!
3. Displays a scrollable list of the next 20 scheduled shuttle departures for your trip.

I don't know if my app looks all that great, but I do feel pretty confident that it fulfills the three tasks that I argued are at the core of a typical shuttle rider's usage. I really do hope that Harvard gets it act together now, because, well, it's the 21st century, and the best tools they have for us are a map with colors and a frustrating set of schedules. Why they haven't abstracted the routes out into a user-friendly form (or at least opened up data for third parties like **students who are eager to make new tools like this**) is well beyond me.

I plan on releasing my JSON "database" (if you will) of the shuttle schedule before I graduate, so that others can make use of it for their own apps for other platforms. It's technically usable right now, but I want to spend a lot more time cleaning up the parser and the scraper.

Update (9/2014): The schedules and their format keep changing, and since I've graduated, I've pulled the app from the store and am no longer maintaining it.  I'm still keeping this post up since the tools are still lackluster as of today, and someone may find the code instructive.