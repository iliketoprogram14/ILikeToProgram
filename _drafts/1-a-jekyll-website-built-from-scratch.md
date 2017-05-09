---
layout: post
title: A Jekyll website built from scratch using WSL
#date: 
tags: [jekyll, windows, bash, wsl]
image: 
image_alt: 
image_caption: 
description: 
---

 - Building on WSL dev environment
 - install ruby
 - install jekyll
 - jekyll new
 - gemfile
 - directory structure
   + _posts
   + _includes (header, footer, head, analytics)
   + _layouts (default and post)
   + _sass
   + _data
   + assets (images, css, js)
   + files (archive, about, projects, 404)
   + _config.yml
   + index.html/index.md
   + robots.txt
 - plugins
   + jekyll-feed (https://github.com/jekyll/jekyll-feed)
   + jekyll-paginate
   + jekyll-sitemap
 - using sass
 - comments?
 - using your own domain
 - references:
   + http://nicolashery.com/fast-mobile-friendly-website-with-jekyll/
   + http://jmcglone.com/guides/github-pages/
   + https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/
   + https://github.com/barryclark/jekyll-now
   + https://www.chenhuijing.com/blog/setting-up-custom-domain-github-pages/


In the [last post]({% post_url 2017-04-27-wsl-a-windows-dev-environment-for-jekyll-websites %}), we discussed setting up a dev environment includes the Windows Subsystem for Linux and Visual Studio Code.  This post will focus on building a Jekyll website from scratch in this environment.

<!--more-->

## Installing Jekyll ##

According to the [documentation](http://jekyllrb.com/docs/installation/){:target="_blank"}, there are a number of dependencies to install: gcc, make, and ruby.

To install gcc and make, the built-in package handling utility, [apt-get](https://linux.die.net/man/8/apt-get){:target="_blank"}, can be used to download the [build-essential package](http://packages.ubuntu.com/precise/build-essential), which includes gcc and make.

{% highlight shell %}
sudo apt-get update # Updates all installed packages to the latest version
sudo apt-get install build-essential
{% endhighlight %}

Next, Ruby will need to be installed.  It turns out that Ruby actually comes installed by default, but as of the Creator's Update for Windows 10, but installing Jekyll fails due to some permissions error.  This can be worked around by using the [Ruby Version Manager](https://rvm.io/){:target="_blank"}, aka rvm, to install ruby.

{% highlight shell %}
\curl -L https://get.rvm.io | bash -s stable # Installs RVM
source /home/<username>/.rvm/scripts/rvm # Substitute <username> for the actual username
rvm list known # Lists known versions of Ruby
rvm install ruby-<version> # Substitute <version> for the actual version, eg 2.4
{% endhighlight %}

The 2nd line must be run in every command prompt window launched in which ruby will be run.  I recommend appending it to the .bashrc file (/home/<username>/.bashrc), which is run every time a new command prompt window is launched.

For the third line, the version of Ruby must be greater than 2.0.  I installed 2.4, which has been sufficient for me so far.  Versions 1.9 and newer of Ruby come with "RubyGems" which is the last requirement detailed in the documentation.

Finally, we can install Jekyll using RubyGems, which is Ruby's package manager, where a gem is a package.  At this point, I would also recommend installing the [bundler](http://bundler.io/){:target="_blank"} gem, which is incredibly useful for managing gems for individual projects and is actually mandatory if the website will be published to [GitHub Pages](https://pages.github.com/){:target="_blank"}.  Furthermore, Jekyll plugins are conveniently just gems, so bundler can also be used to manage those as well.

{% highlight shell %}
gem install jekyll bundler
{% endhighlight %}

## Your first Jekyll project ##

