---
layout: post
title: New look - Changing hosts and moving to Jekyll
date: 2017-04-20
tags: [updates, website, jekyll, s3, github-pages, wsl]
image: /assets/images/oldsite_v2_small.png
image_alt: Old site
image_caption: The old website
description: iliketoprogram.com has been given a new coat of paint.  It is now built using Jekyll in a Windows dev environment and is hosted in GitHub pages.
---

Originally, this site was created during college as a place to show off some side projects when applying for jobs, as well as a means to maintain my super basic web dev skills.  I've since graduated and moved on to getting some jobs, but this website has pretty much [only changed once]({% post_url 2012-01-12-makeover %}), and that was **5 years** ago.

It was about time for a refresh.

The site has changed in 3 key ways:

- Layout
- Underlying code
- Hosting

<!--more-->

 Additionally, I want to start focusing on generating long form content in the form of guides, tutorials, and opinions to help others who may have hit the same problems that I have.  Initially I'll be focusing on how this website got brought up, but in the near future I plan on talking about drivers primarily for Windows as well as financial topics.

## Layout ##

Before these changes, the website looked something like this:

![The old site](/assets/images/oldsite_v2.png "The old site")

In that old design, I treated a flat list of "labels" aka tags as a first-class citizen on the home page.  Looking back, this may not have been a great idea since there will probably be a large amount of tags in the future.  Furthermore, finding posts meant either a) browsing through the labels or b) digging through the archive which was broken down by year and month.  Since my blog was (and still is) pretty small, this is an alright solution, but it won't scale once more content is added to the site.

The archive sidebar has been replaced by the archive page, which is just a flat list sorted by year.  The posts aren't collapsed or anything, so users can browse the headlines.  A [Google Custom Search Engine](https://cse.google.com/cse/){:target="_blank"} search bar to quickly find content.  There isn't a replacement for browsing tags right now, but that may be something I'll add later; thanks to some underlying code changes I'll touch on later in this post, doing so would be extremely trivial.

The plans page has been completely eliminated, since they change all the time depending on time constraints and my whims.  It was pretty common for old posts to say something along the lines of "I hope to get started on blah blah project next week, described on the plans page" and then of course there'd be no follow-up

The biggest change by far is the projects page.

![The old projects page](/assets/images/oldsite_v2_projects.png "The old projects page")

Binary and source code downloads for the projects were hosted on that page, since GitHub wasn't as popular a website when I first started out.  It effectively had a description, a README, some metadata (e.g., language, documentation), a slide show of screenshots, and a list of downloads.  With the emergence of GitHub and other version control hosting services, the projects page became redundant.  The only things I really miss about that page was how the content was uniformly laid out and the screenshot slide show, but that's not a big loss at all when I get free hosting and no longer have to maintain the page and a bunch of zips.

I've also changed the style of the site drastically to go for a more minimal feel as well as scale very well for mobile devices.

## Code ##

By far the biggest change was the move from PHP plus a MySQL database to [Jekyll](http://jekyllrb.com/){:target="_blank"}, a static website generator.

Beforehand, each page was a mix of HTML and PHP which would retrieve data from the database and wrap it in more HTML; in other words, content was stored in the database, and markup was done primarily in PHP with a bit of JavaScript here and there.  Content was uploaded to the database using my own crude "content management system" as a mix of weird HTML and plain text, and frankly it had a hard time dealing with spacing or uncommon characters, which was always a pain point.

With Jekyll, content is written in [Markdown](https://en.wikipedia.org/wiki/Markdown#Example){:target="_blank"} or raw HTML and passed through a template engine called [Liquid](https://github.com/Shopify/liquid/wiki){:target="_blank"} to create static HTML files.  This results in a number of advantages over what I was doing previously as well as other CMSs:

- Because there is no server-side logic to run, loading pages is **super** fast, since it's just plain HTML and the occasional JavaScript.
- Content like blog posts are no longer hidden away inside databases or content management systems.  It's completely self-contained in easily-readable flat files that you can store anywhere, including a version control system like Git.
- Because the website is built locally before being put on the hosting service, the developer gets to control what is or isn't included in the website; compare this to a CMS like WordPress which relatively is very heavy with bloat.
- For the same reason as the previous point, there are way less security vulnerabilities because there is no database and no PHP.

There are definitely some cons to Jekyll, especially when trying to adapt it for more complex sites which I'll get into in future posts, but for my purposes and this site, it's absolutely fantastic.

Previously, Jekyll was only meant to be developed on *nix systems or Macs.  However, with the release of the Creator's Update for Windows 10, the [Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/about){:target="_blank"}, or WSL, is now more than functional as a development environment, and in fact it's easy to build websites using Jekyll in Windows as a result.  I've enjoyed the experience so much that I plan on writing a series of posts about my experience building this site in a Windows environment using Jekyll.

## Hosting ##

I'm a pretty cheap guy, so this website originally used to be hosted on [000webhost](https://www.000webhost.com/){:target="_blank"} which I believe to this day still offers free hosting with PHP and MySQL support.  The caveat back then was that sites without a minimal amount of traffic would be taken down every month.  I ended up having to re-upload the site every month.

Eventually I switched to the free tier at [Hostinger UK](https://www.hostinger.co.uk/web-hosting){:target="_blank"} around three years ago.  Since the site was hosted in the UK though, it was pretty slow to load for me.

In 2017, there are now more options around for cheap hosting low-traffic websites, and even more if a website doesn't need to run any server-side code like PHP.  I moved this site to the super-cheap [Amazon S3](https://aws.amazon.com/s3/){:target="_blank"} for a few days before settling on [GitHub Pages](https://pages.github.com/){:target="_blank"}.  I plan on writing a post comparing the two services, but I found that GitHub pages met all my needs, [can actually build Jekyll sites for you](https://help.github.com/articles/about-github-pages-and-jekyll/){:target="_blank"} (so it doesn't need to be done locally), and is completely free versus the few cents per month for S3 plus the risk of a large bill if a DDoS occurred.

The other change I made in this area was switching domain registrars.  I've used [1&1 Domains](https://www.1and1.com/domain-names?ar=1#stage){:target="_blank"} since this site's inception, but their UX has gone down the drain over the past few years.  I ended up switching to [Amazon Route 53](https://aws.amazon.com/route53/) when I switched my hosting service to S3 in order to use Amazon's CDN, [Amazon Cloudfront](https://aws.amazon.com/cloudfront/){:target="_blank"}, to enjoy SSL support.  The UX for Route 53 is way better; it's much simpler and is not trying to actively upsell you on other products, which is nice for a change.  I've since changed CDNs to [Cloudflare](https://www.cloudflare.com/cdn/){:target="_blank"} which offers a [free tier that includes SSL certificates, a global CDN, and limited DDoS protection](https://www.cloudflare.com/plans/){:target="_blank"}.

All these changes have resulted in this website, which I hope users will enjoy more.  I'm genuinely looking forward to tinkering with it down the line as well as writing some material for the site.