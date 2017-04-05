---
layout: post
title: Windows Phone Tiles
date: 2014-01-12
tags: windows-phone
---

I really enjoyed making my first Windows Phone app. I'm a fan of the ease of use of C#, and the plethora of libraries allow me to not worry about trivial things like parsing strings, which takes a lot of unnecessary pain at development time. Of course though, there's definitely some weird things with the Windows Phone SDK, just as there are with any other platform.

One thing that was unnecessarily hard to figure out was altering the color of the default tiles. Developers can change the tile images by opening up the WMAppManifest.xml file and uploading images with transparent backgrounds. However, there's no option to change the color of the background of the tile templates, unlike Windows 8.

Devs can get around this by right clicking on the file and clicking "View in code". You'll notice that there's a BackgroundColor property under your selected tile template (eg, &#060;TemplateIcon&#062;...&#060;BackgroundColor&#062;&#060;/BackgroundColor&#062;...&#060;/TemplateIconic&#062;). You can change the color by inserting an RGB value between the BackgroundColor tags.

Here's the catch though: there must be no whitespace between the tags and the value. For example the following xml <b>doesn't</b> work.<code>&#060;BackgroundColor&#062;
<span style="margin-left: 15px">#4477aa</span>
&#060;/BackgroundColor&#062;</code>But the following does:<code>&#060;BackgroundColor&#062;#4477aa&#060;/BackgroundColor&#062;</code>This took me way too long to figure out.It's not documented anywhere official (as far as I know), and googling around didn't really turn up anything immediately. I wonder if this is why so many apps use the theme color instead of choosing their own.

Regardless, hopefully this will be fixed in future SDK releases.