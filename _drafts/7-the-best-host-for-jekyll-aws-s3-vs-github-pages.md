---
layout: post
title: The best host for Jekyll - AWS S3 vs GitHub Pages?
date: 2020-01-01
tags: [jekyll, github-pages, aws-s3]
image: 
image_alt: 
image_caption: 
description: 
---

 - S3
   + Builds locally
   + Can use any plugin you want
   + Costs money - $1-2/month, probably less on average depending on size
   + Scales
   + Supports custom root domains
   + DDOS could murder your bill
   + Web UI blows
   + Have hit a few bugs in WSL, although it worked 99% of the time
 - GitHub pages
   + Free
   + Local development experience is worse (but can be mitigated) (kinda true)
   + Seems to be faster globally (eh)
   + For a custom domain, users have to use www. (not true)
   + Limited to plugins, unless I choose to push the generated _site (https://github.com/jrheard/jrheard.github.io)
   + Would need to use cloudflare for ssl with custom domain (https://hackernoon.com/set-up-ssl-on-github-pages-with-custom-domains-for-free-a576bdf51bc)
 - References
   + https://www.slant.co/versus/8135/13313/~amazon-s3_vs_github-pages (top result - not accurate on a lot of counts)