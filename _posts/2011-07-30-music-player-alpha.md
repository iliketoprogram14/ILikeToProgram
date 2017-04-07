---
layout: post
title: Music Player Alpha
date: 2011-07-30
tags: [updates, music-player]
---

Alright, the <a href="{{ site.data.projects['playlistshuffler'].url }}">first playlist shuffler release I planned for</a> is up. In addition to adding playlist support, I tweaked the xml for playlist use, which is generated from reading the results of the [iTunes importer](http://www.ericdaugherty.com/dev/itunesexport/){:target="_blank"}. I also added an installer and a sort of messy set up wizard that grabs the iTunes playlists.

<!--more-->

I realized that the resource data gathered from the last run (see last post) were actually higher than optimal because I was using a Debug configuration. Using a Release config, the numbers decrease to 13MB RAM usage and 2% cpu usage. Such win :)

Next up is adding an information pane, adding a busy icon during playlist import, and generally "prettifying" the whole form, as it's pretty simple and ugly right now. I'll also be making some code changes to make it more optimal as well as add more documentation, so I'll put up the source and a spec as soon as I finish all this. I should be done with this awesome project by the end of this week or next week!!