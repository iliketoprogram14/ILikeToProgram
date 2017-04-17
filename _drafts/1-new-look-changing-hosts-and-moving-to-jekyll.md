---
layout: post
title: New look - Changing hosts and moving to Jekyll
date: 2020-01-01
tags: [updates, website, jekyll]
image: /assets/images/post_img.png
image_alt: New look
image_caption: New look for the website
description: 
---

 - Layout changes
   + Projects moved from being locally hosted to github
   + Plans section scrapped, since I change my mind all the time
   + Archive moved to separate page
   + Tags are no longer browseable
 - Code
   + Moved from PHP+html+MySQL to html+Markdown+JS+YAML+Liquid generated by Jekyll
   + Moved from CSS to SASS
   + Will talk more about Jekyll in future posts
 - Hosting and domains
   + Changed domain registrars from 1&1 to Amazon Route 53
   + Initially moved from Hostinger to Amazon S3
     * Required that I use Amazon Cloudfront to hook up Route 53 to S3 using https
   + Later changed to GitHub pages and Cloudflare
     * Will discuss why as well as the pros and cons of each later
 - Future posts
   + Jekyll
   + Windows drivers
   + Personal finance