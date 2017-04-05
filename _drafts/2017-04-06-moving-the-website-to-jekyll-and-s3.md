---
layout: post
title: Moving the website to Jekyll and S3
date: 2017-04-06
tags: updates website
---

# Inspiration
 - Site is slow hosted on free webhost Hostinger
 - Would like to move to cheap/free host with great speed for low volume
 - Would like to simplify website
 - Thought about Wordpress, but not cheap and still stuck with free hosts
 - S3 is powerful and cheap, but requires the site to be static to enjoy those benefits
 - Still want to be able to tinker with website
 - [Inspiration](https://startupnextdoor.com/from-wordpress-to-jekyll-to-ghost/)

# Jekyll setup
 - Based on [Jekyll installation page](https://jekyllrb.com/docs/installation/)
 - Installed [Bash on Windows](http://www.windowscentral.com/how-install-bash-shell-command-line-windows-10)
 - sudo apt-get install nodejs build-essential
   + Installs nodejs, gcc, and make
 - Python 2.7.x should already be installed
 - Install Ruby
   + \curl -L https://get.rvm.io | bash -s stable
   + source /home/<username>/.rvm/scripts/rvm
   + rvm install ruby-2.x.x
 - gem install jekyll

# S3 setup
 - Sign up for an AWS account
 - Create a bare website following [this guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html)
 - Download the amazon AWS cli
   + sudo apt-get install awscli

# Local setup
 - [RTFM](https://jekyllrb.com/docs/home/)
 - Create the directory structure
   + A bare structure includes _posts and _layouts, optionally [_includes](https://jekyllrb.com/docs/includes/) and css
 - Under _posts, [create a post](https://jekyllrb.com/docs/posts/) such as 2017-04-06-first-post.md
 - Under _layouts, [create layouts](https://jeremenichelli.github.io/2015/07/building-blog-jekyll-creating-layouts/#_layouts) like default.html and post.html
 - Create index.html

# Test setup
 - From working directory, run "jekyll build"
 - [Install Apache for Ubuntu](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Set_up_a_basic_working_environment)
 - Update DocumentRoot in /etc/apache2/sites-available/000-default.conf to point to the _sites subdirectory in your working directory
 - Navigate to localhost in your favorite browser

# Test loop
 - Run jekyll build (--incremental flag?) and refresh localhost
 - Alternatively, run jekyll build --watch once, then subsequently only refresh localhost whenever you make changes

# Deployment setup
 - Set up aws cli
 - aws sync _site/ s3://<bucket>

# Deployment loop
 - aws sync _site/ s3://<bucket>
 - Can just add as a post hook to git push or whatever 

# Writing posts
 - I use the _drafts folder
 - If you want to preview your markdown in real time on Windows, try out Visual Studio Code with the "Instant Markdown" extension
   + After restarting, any markdown you are editing will be updated in a browser immediately!
 - VS Code also has a preview button in the top right corner
   + Using the split editor view, you can see the changes in real time in the editor