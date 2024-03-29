---
layout: post
title: Music Player Fail
date: 2011-07-26
tags: [updates, music-player, fails]
image: https://i.stack.imgur.com/cYICU.png
image_alt: Windows Deskband
image_caption: A Windows "Deskband"
description: Creating a music player in C# to shuffle iTunes playlists in Windows.
---

After a week's break, I decided to attempt making a C# Music Player in the form of a [Deskband](http://i.msdn.microsoft.com/dynimg/IC295005.png){:target="_blank"}.

But that absolutely failed.

Specifically, my computer did not agree with registering my deskband player in the registry no matter what I tried, so I had to go to a Windows Form Application.

<!--more-->

My goal is to create a pretty minimal player that shuffles iTunes music and playlists using different audio libraries for audio support, starting with [Ambiera's IrrKlang engine](http://www.ambiera.com/irrklang/){:target="_blank"}. I've been working pretty hard at this application for two days now, and I'm extremely happy with my progress. Besides two blocking errors, I've only spent a few hours making a simple GUI, implementing play/pause and stop functionality, previous and next song functionality, and shuffling through iTunes playlists. Additionally, it's only using 24MB of RAM and 3% of the CPU, max, which is substantially better than iTunes.

Tomorrow (or today lol) I plan on adding a ComboBox for switching playlists, which I already support, and adding an info pane to display song information. I'll put up that release, and then I'll probably tweak the GUI and put up that release as well. My goal is to minimize the player's CPU and RAM usage under the constraints of C#. If you have any ideas about what you'd like to see in a music player, [I'd love to hear about it](/about.html).