---
layout: post
title: Found huge memory leak in Harvard Shuttle
date: 2013-04-22
tags: shuttle
---

So it turned out there was a <b>huge</b> memory leak in the <a href="http://bit.ly/11ugIYE">Harvard Shuttle app I just released</a>. I was doing a pretty good job of cleaning up my data structures, even though there was really no need to in a managed language like C#. But lo and behold, when I opened up Task Manager to kill something, I saw that my app took up over 500MB of RAM (!!!). Either way, I definitely should've ran a memory profile on the app before sending it out.

It took me a while to find a good tool to figure out where the memory leak was coming from. I eventually came across [this post](http://msdn.microsoft.com/en-us/magazine/jj721593.aspx){:target="_blank"}, which is a super detailed, step-by-step process on how to hunt down memory leaks with any C# app (for whatever reason, WinDBG didn't play nice with my app; not sure if this is my fault, or a Windows Store app issue). For the TL;DR, you'll need to download a tool called PerfView, which is linked in the article, and use that to create a diff between two snapshots of the heap for your app. From there, you can figure out where the memory leak is coming from.

It turned out that the leak for Harvard Shuttle was coming from an instance of a [ThreadPoolTimer](http://msdn.microsoft.com/en-us/library/windows/apps/windows.system.threading.threadpooltimer.aspx){:target="_blank"} for updating the shuttles every few seconds as well as the app every minute. I wasn't cancelling the timer when the user exited the page, since I thought the timer's queue would be garbage collected once the view was dismissed, but it stayed in memory at 35 MB <b>per instance</b> of a ThreadPoolTimer!  Once I cancelled the timer on every view dismissal, the app's memory usage went back to reasonable, and there doesn't seem to be any more leaks!

I'll probably be submitting an updated version of the app to the store right now, and hopefully it'll get pushed to the store soon.

Update (4/23/2013): The update has been pushed to the store, so the memory leak issue is gone in the latest release!