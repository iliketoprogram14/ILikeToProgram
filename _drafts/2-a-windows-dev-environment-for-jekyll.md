---
layout: post
title: A Windows dev environment for Jekyll websites - WSL
#date: 
tags: [windows, dev-env, wsl, bash, jekyll, guide]
image: imgur.com/Rq9TURL
image_alt: 
image_caption: 
description: 
---

 - Installing WSL (http://www.windowscentral.com/how-install-bash-shell-command-line-windows-10)
 - .bashrc
 - inputrc
 - (optional) - apache2 aka apachectl
   + https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Set_up_a_basic_working_environment
 - Visual Studio Code
   + keyboard shortcuts (emacs keymap for me)
   + bash as default terminal (terminal.integrated.shell.windows)
   + markdown preview
   + built-in git for quick commit, sync, diffs (but that's all it's good at)
 - Git
   + keys
 - Extensions
   + HTML snippets
   + Settings Sync
   + XML Tools?
   + Git History
   + Code Runner


Before we get started with Jekyll, we need to have a working Windows developer environment, ideally one that works for general web site development.  In this post, I'm going to detail my environment.  It may not be the best or the most efficient set of tools out there, but it's very functional and was very easy to set up, something I value since I like to work from both my desktop and my laptop.

All you need to get started is a PC running Windows 10.  The PC will need to be on the latest update as of the date of this post, which is called the "Creator's Update."  The Windows 10 version can be checked by going to Settings->System->About and examining the "Version" field.  The Creator's Update is version 1703.

There's a lot going on in this post, so in order to keep the guide lean, extra details and my opinions will be moved to the bottom of the guide in a separate section.

<!--more-->

## Bash on Ubuntu on Windows 10 ##

The first thing to do is to install "Bash on Ubuntu on Windows 10" (Microsoft has always had a way with naming things!).  To do this, the "Windows Subsystem for Linux" will need to be enabled, followed by installing "Bash on Ubuntu" itself.  [Windows Central wrote up a fantastic guide with pictures](http://www.windowscentral.com/how-install-bash-shell-command-line-windows-10), though the information towards the end of the guide is a bit stale.  From here, devs are free to install other shells like zsh if they so choose.

Next, I highly recommend taking a few minutes to configure the terminal to your liking using a .bashrc file, which is a file of shell commands that are run when a new shell window is started located in the home directory ~, shorthand for /home/\<username\>.  An example of a fairly complex .bashrc file can be found [here](http://tldp.org/LDP/abs/html/sample-bashrc.html), but the default one is sufficient to get things done.

Optionally, devs may want to enable case-insensitive auto-complete at the command line, especially if they're used to working in CMD or PowerShell.  To do this,  the relevant commands needs to be added to the inputrc file, located at ~/.inputrc for the local user and /etc/inputrc for all users, the latter of which is protected by root permissions.  I personally used /etc/inputrc, so I ran the following command to append the command to the inputrc file:

{% highlight shell %}
echo 'set completion-ignore-case On' | sudo tee -a /etc/inputrc
{% endhighlight %}

## Text editor of choice: Visual Studio Code ##

Devs can use whatever text editor they want here.  I wanted to try out Visual Studio Code, and this website was a good excuse to do so.  It ended up being a good choice too because it's fast, it has native integration with Git, it has an extensive library of free plugins, and it has an integrated terminal that can run bash.

### Setup ###

First, [download and install the stable build of VSC](https://code.visualstudio.com/).