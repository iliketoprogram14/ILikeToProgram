---
layout: post
title: WSL - A Windows dev environment for Jekyll websites
date: 2017-04-27
tags: [windows, dev-env, wsl, bash, jekyll, guide, visual-studio-code]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Visual_Studio_Code_0.10.1_icon.png/256px-Visual_Studio_Code_0.10.1_icon.png
image_alt: Visual Studio Code
image_caption: By <a href="https://commons.wikimedia.org/wiki/File%3AVisual_Studio_Code_0.10.1_icon.png" target="_blank">Microsoft</a>
image_license: mit
description: A guide to setting up WSL (aka bash on Ubuntu) and Visual Studio Code in Windows for web development with Jekyll.
---

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

First, [download and install the stable build of vscode](https://code.visualstudio.com/).

Next, set the default terminal to bash.  Go to File->Preferences->Settings, and search for terminal.integrated.shell.windows.  Press the pencil icon to edit the setting, and set the field to "C:\\Windows\\sysnative\\bash.exe".

Lastly, familiarize yourself with the environment.  Keyboard shortcuts are configurable, and there are a few extensions out there called "keymaps" which can re-map the keyboard shortcut bindings to match those of other editors, e.g. Emacs or Vim.  Change the color theme under File->Preferences->Color Theme.  Browse through the nav bar on the left-hand side which shows the file explorer, a fairly powerful search tool, a basic source control panel, a debugging panel, and the extension management panel.  For each editor window, the upper right hand corner contains buttons to view changes with the previous commit, split the editor window into two or three, and optionally preview a rendering of the file, such as for Markdown files.

### Source control ###

As of the date of this post, vscode only has integrated support for Windows Git.  Currently, the source control panel makes it easy to view diffs from the latest commit, create a commit, and revert changes.  A menu with three dots contains other common (and necessary) Git commands like push, pull, and pull rebase, but any other Git command must be done in another environment.

Because vscode only uses Windows Git, it'll actually have to be installed separately, so [here's a link](https://git-scm.com/download/) to download it.  SSH keys are stored in the %HOME%\.ssh folder, and the ssh config file is located at "Path\To\Program Files\Git\etc\ssh\ssh_config".

### Extensions ###

Visual Studio Code ships with a lot of features and [support for a bunch of languages](https://code.visualstudio.com/docs/languages/overview), and many extensions are available to extend the feature set and language support even further.  They can be installed by searching for them in the extensions panel in the left hand nav bar.  I've included my recommendations for basic web dev extensions at the end of this post.

### Tasks ###

Visual Studio Code has the ability to invoke third party tools via ["tasks"](https://code.visualstudio.com/docs/editor/tasks) and not only display the output of the task but also compare the output against success and error patterns.  Probably the most obvious usage of tasks is invoking a build tool like Make or a task runner like Grunt or Gulp via a keyboard shortcut.  The link above demonstrates how to construct basic tasks as well as multiple tasks and background tasks.

In my case, I created a background task that constantly builds the Jekyll site and hosts it at localhost:4000, which I'll show in a later post.

### Debugging ###

VSCode also includes [an integrated debugger that can debug JavaScript and TypeScript with support Node.js out of the box](https://code.visualstudio.com/docs/editor/debugging).  There are many extensions that build upon the debugger to support other languages like PHP, Python, or C#, for example.

After creating a debug configuration called a "launch configuration" in a launch.json file, devs can take advantage of standard debugger features like start/restart/pause/stop and step over/into/out as well as setting breakpoints, viewing the call stack, examining variables in the stack and globally, evaluating expressions using the debug console, and adding variables to a watch list.  The link above shows how to create a launch configuration file and much more.

For the website, I created a launch.json file which references the "Debugger for Chrome" extension, which I'll share in a future post.

## My opinions ##

Below are some of my personal thoughts on bash and Visual Studio Code.

### Why use bash over cmd or PowerShell in Windows? ###

This is actually the wrong question to ask, because with the Creator's Update, bash can be invoked by cmd or PowerShell, and cmd and PowerShell can be invoked by bash!  The first case was always possible, but the second case came to life by [introducing the ability to run Windows binaries from bash](https://msdn.microsoft.com/en-us/commandline/wsl/interop?f=255&MSPPError=-2147217396#invoking-windows-binaries-from-wsl).  The question then becomes, when should I use \<command line tool\> when doing \<task N\>?  I've been using bash for its built-in *nix tools like grep as well as to install build tools like gcc and make or Linux- or OS-X-specific technologies like Jekyll.  It's much less painful than the alternatives like [MinGW](http://mingw.org/) or [Cygwin](https://www.cygwin.com/)!  The only downside for me is that I haven't figured out how to do driver development, but it's not like that would make any sense anyway :)

### Why Visual Studio Code? ###

I wanted to use a fast, universal text editor on Windows for quickly editing individual files as well as handling small- to medium-sized projects, as opposed to a full-fledged IDE like Eclipse or Visual Studio.  Additionally, I thought it would be nice if the editor had the following features:

- Extensions with great community support
- Syntax highlighting for many languages, or at least it's easy to add for uncommon languages
- Built-in terminal
- Built-in debugging
- Built-in source control
- Free

I had been wanting to try Visual Studio Code for a while, and since it hit all these checkboxes with ease, this was a great excuse to do so.  Other text editors that I considered were Sublime (not free), Atom (basically a slower version of Visual Studio Code), and Notepad++ (ugly).  I had been using Emacs for years as my go-to editor for quick changes or small projects, but it was always a bit of a pain to find **working** extensions for languages like C# or PowerShell.

#### VSCode extension recommendations ###

I recommend the following extensions for basic web development:

- [HTML snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets) for html descriptions, colorization, and tag auto-completion
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) to get built-in debugging with Chrome
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) since it surprisingly doesn't come in the box
- [XML Tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) to sync settings between instances of vscode among computers
- [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) to run snippets of code; supports lots of languages like JavaScript and PHP

I use a few other extensions for other languages or specific scenarios, but those are probably the most common and useful ones out there.