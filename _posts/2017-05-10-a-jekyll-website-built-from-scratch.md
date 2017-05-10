---
layout: post
title: A Jekyll website built from scratch using WSL
date: 2017-05-10
tags: [jekyll, windows, bash, wsl]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ben_test_tube.svg/255px-Ben_test_tube.svg.png
image_alt: Jekyll
image_caption: By <a href="https://commons.wikimedia.org/wiki/File:Ben_test_tube.svg" target="_blank">Ben of OpenClipart</a>
image_license: cc0
description: A guide to creating a new Jekyll project in Windows using bash (aka, the Windows Subsystem for Linux) and Visual Studio Code.
---

In the [previous post]({% post_url 2017-04-27-wsl-a-windows-dev-environment-for-jekyll-websites %}), we discussed setting up a dev environment consisting of the Windows Subsystem for Linux and Visual Studio Code.  This post will focus on building a Jekyll website from scratch in this environment.

<!--more-->

## Installing Jekyll ##

According to the [documentation](http://jekyllrb.com/docs/installation/){:target="_blank"}, there are a number of dependencies to install: gcc, make, and ruby.

To install gcc and make, the built-in package handling utility called [apt-get](https://linux.die.net/man/8/apt-get){:target="_blank"} can be used to download the [build-essential package](http://packages.ubuntu.com/precise/build-essential), which includes gcc and make.

{% highlight shell %}
> sudo apt-get update # Updates all installed packages to the latest version
> sudo apt-get install build-essential
{% endhighlight %}

Next, Ruby will need to be installed, since Jekyll is written in that language.  It turns out that Ruby actually comes installed by default, but as of the Creator's Update for Windows 10, installing Jekyll fails due to some permissions error.  This can be worked around by using the [Ruby Version Manager](https://rvm.io/){:target="_blank"}, aka rvm, to install ruby.

{% highlight shell %}
> \curl -L https://get.rvm.io | bash -s stable # Installs RVM
> source /home/<username>/.rvm/scripts/rvm # Substitute <username> for the actual username
> rvm list known # Lists known versions of Ruby
> rvm install ruby-<version> # Substitute <version> for the actual version, eg 2.4
{% endhighlight %}

The 2nd line must be run in every shell session in which ruby will be run.  I recommend appending it to the .bashrc file (/home/\<username\>/.bashrc), which is run every time a new shell is launched.

For the third line, the version of Ruby must be greater than or equal to 2.0.  I installed 2.4, which has been sufficient for me so far.  Versions 1.9 and newer of Ruby come with "RubyGems" which is the last requirement detailed in the documentation.

Finally, we can install Jekyll using RubyGems, which is Ruby's package manager, where a gem is a package.  At this point, I would also recommend installing the [bundler](http://bundler.io/){:target="_blank"} gem, used for managing other gems and their respective versions for individual projects and pretty much required if the website will be published to [GitHub Pages](https://pages.github.com/){:target="_blank"}.  Furthermore, Jekyll plugins are conveniently gems, so bundler can be used to manage those as well.

{% highlight shell %}
> gem install jekyll bundler
{% endhighlight %}

## A starter Jekyll project ##

There are lots of ways to get started with Jekyll, but I recommend starting pretty much from scratch in order to develop a better understanding of the fundamentals of the Jekyll framework and then building on that base from there.

Fortunately, Jekyll provides a built-in way to start with a skeleton, assuming bundler is installed:

{% highlight shell %}
> jekyll new /path/to/project # can just be "." for the current directory
{% endhighlight %}

That command provides the following file structure:

- _posts/ - the directory where posts are located
- index.md - the home page, written in Markdown
- about.md - an about page, written in Markdown
- _config.yml - the Jekyll config file, written in YAML
- Gemfile - [the file used by bundler for managing gems/plugins required for the project](http://bundler.io/gemfile.html){:target="_blank"}, which by default lists the Jekyll gem, the "minima theme" gem, and the "jekyll-feed" plugin
- Gemfile.lock - [a snapshot of the gems and their versions listed in the Gemfile](http://bundler.io/v1.3/rationale.html){:target="_blank"}

Running the following command will feed these files to Jekyll which will in turn spit out the HTML and CSS website in the _site/ directory:

{% highlight shell %}
> jekyll build
{% endhighlight %}

Running the next command will build and then host the generated website at the address "localhost:4000", which is viewable in a browser:

{% highlight shell %}
> jekyll serve
{% endhighlight %}

To get rid of the theme entirely, delete the about page, and delete the lines that contain a reference to the "minima" theme in the Gemfile and _config.yml.  Update Gemfile.lock to get rid of the minima gem by running:

{% highlight shell %}
> bundle update
{% endhighlight %}

A great example of a more fleshed out skeleton is [Jekyll Now](https://pages.github.com/versions/){:target="_blank"}.  It contains additional directories that are explained upon in the next section.

## The directory structure ##

For most websites generated by Jekyll, their corresponding projects will have the corresponding structure, similar to [what's laid out in the documentation](https://jekyllrb.com/docs/structure/){:target="_blank"}:

- _posts/
- _drafts/
- _site/
- _includes/ - contains partial HTML files that can be included by other html files, eg analytics, headers, footers, etc.
- _layouts/ - contains HTML files that serve as templates for individual pages, eg post.html, default.html, guide.html
- _sass/ - contains any partial [SASS/SCSS](http://sass-lang.com/){:target="_blank"} files, which is natively supported by Jekyll
- _data/ - contains any static, "well-formatted site data" such as csv or json files
- assets/ - recommended to contain the main css/scss/sass file, images, and JavaScript files
- files/ - recommended to contain individual pages such as the about page or a 404 page
- _config.yml
- index.md or index.html
- Gemfile
- Gemfile.lock

## Common Jekyll plugins ##

Jekyll sports an extensive [plugin system](https://jekyllrb.com/docs/plugins/){:target="_blank"}.  The three most common (and most useful, in my opinion) plugins for blogs are:

- [jekyll-feed](https://github.com/jekyll/jekyll-feed){:target="_blank"} - generates an atom feed of the website
- [jekyll-paginate](https://jekyllrb.com/docs/pagination/){:target="_blank"} - offers pagination for the posts
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap){:target="_blank"} - generates a sitemap

There are lots of other fantastic plugins out there, but note that if the website will be hosted on *and generated by* GitHub Pages, then the project will only be able to use [a subset of approved plugins](https://pages.github.com/versions/){:target="_blank"}.

## Further reading ##

One great aspect of using Jekyll over other static site generators is that the community around it is pretty active, resulting in lots of guides and helpful reads all over the web.  Here is a short list of ones that helped me a lot when I got started.

- [This was the first resource I stumbled across by luck, and it ended up being the most helpful](http://nicolashery.com/fast-mobile-friendly-website-with-jekyll/){:target="_blank"}
- [A guide explaining Git, GitHub, and GitHub Pages](http://jmcglone.com/guides/github-pages/){:target="_blank"}
- [Building a Jekyll site on GitHub Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/){:target="_blank"}
- [Setting up a custom domain on GitHub Pages](https://www.chenhuijing.com/blog/setting-up-custom-domain-github-pages/){:target="_blank"}

For reference, I plan on writing a future post detailing miscellaneous Jekyll tips and tricks such as implementing site-wide search and SEO tags.