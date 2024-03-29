---
layout: post
title: Nooooo!!! Apple broke my music player!!!
date: 2012-01-09
tags: [updates, music-player, isbn-scanner, school]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Benz_Darkness.png/256px-Benz_Darkness.png
image_alt: iTunes
image_caption: By <a href="https://commons.wikimedia.org/wiki/File%3ABenz_Darkness.png" target="_blank">Benz.darkness</a>
image_license: ccbysa30
description: My playlist shuffler written in C# depends on parsing iTunes internal xml representation.  Apple changed the structure, breaking the parser, so I've had to adapt accordingly.
---

Now that I finally have some free time, I've been working on a couple of projects.

First, iTunes Match "broke" [my custom music player]({{ site.data.projects['playlistshuffler'].url }}), in a number of ways that weren't really my fault. I was using someone else's program to extract iTunes playlists from the iTunes Library xml file, and it was no longer working for some reason. On top of that, it always used tons of memory (it loaded all the songs into a large array), and took up to 10 minutes for 20,000+ songs.

In other words, this became a great opportunity for me to build a parser myself. So, I added a few C# files that does the same thing in about 5-10 seconds for 24,000 songs, since I just an XML stream reader.

<!--more-->

iTunes Match also converted most of my music to the Apple Lossless format, and the audio API the Playlist Shuffler was using (IrrKlang) did not support .m4a files. So, I switched out the IrrKlang API for the [Bass.Net API](http://www.un4seen.com/){:target="_blank"}. It's not as straightforward as IrrKlang, but it supports more audio formats and seems to be more open to full customization. Either way, it now works, and that's all that really matters to me.

Since I was working on it, I fixed a few bugs (a random number generator misbehaved, and converting pathnames from URL encoding to Unicode). I also added a progress bar with a status label that's displayed when the iTunes library is being parsed. The source and updated documentation will be posted later today.

I've also been working on an ISBN Scanner for my friend's dad. I have all the backend scripts in place, and I've also designed most of the app; all that needs to be done is the implementation. I should have it done this week or next, and I'll be posting some images/video of the app to demonstrate how it works.

I'll also be uploading my updated resume soon, and I may put some time into making this site actually look nice. This semester, I'll finally be taking a Data Structures & Algorithms course, as well as a Distributed Systems course. I'm still deciding on the remaining courses, but I'm considering an introductory Electrical Engineering course and a Systems Design course. Either way, I'm really looking forward to this semester, and my job as a Teaching Assistant for Harvard's CS 51.