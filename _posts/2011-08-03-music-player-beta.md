---
layout: post
title: Music Player Beta
date: 2011-08-03
tags: [updates, music-player]
image: https://raw.githubusercontent.com/iliketoprogram14/MusicPlayerWindow/master/assets/playing.png
image_alt: Playlist shuffler
image_caption: That's an alright interface
description: I've updated my music player side project written in C# for Windows.
---

[The playlist shuffler has been updated]({{ site.data.projects['playlistshuffler'].url }}). I added graphics, a working info pane with scrolling capabilities, and a thumbnail toolbar that allows the user to control the player (sadly, I can't change playlists via jump lists, which would've been awesome). For the final release, I plan to add all documentation and a spec, and maybe a mess around with searching for the iTunes Music Library.

<!--more-->

Currently, the application prompts the user to browse for the iTunes/Music directory, but it may be easier to just search for the iTunes xml library and hope for the best. At the end of the day, I need to design a way to handle errors from a bad library or xml file (the xml file may not be up to date), so that may take up tomorrow night.

Other than those minor issues, I'm pretty much done!