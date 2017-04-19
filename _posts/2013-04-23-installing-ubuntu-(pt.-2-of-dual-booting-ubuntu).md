---
layout: post
title: Installing Ubuntu (Pt. 2 of dual booting Ubuntu)
date: 2013-04-23
tags: [dual-boot, cuda, ubuntu]
image: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UbuntuCoF.svg/256px-UbuntuCoF.svg.png
image_alt: Ubuntu logo
image_caption: Courtesy of <a href="https://commons.wikimedia.org/wiki/File%3AUbuntuCoF.svg" title="Ubuntu logo by Canonical Ltd via Wikimedia Commons">Wikimedia Commons</a>
description: Learn how to install Ubuntu alonside Windows on a laptop to use CUDA.
---

This is the second post in a multi-post series of how to dual boot Ubuntu for CUDA programming on a Windows 8 PC. You can find the first post of the series [here]({% post_url 2013-04-23-dual-booting-ubuntu-with-cuda-on-a-pc-(pt.-1) %}).

The boot process for Windows 8 has changed quite a bit, as documented by [this post](http://neosmart.net/blog/2011/the-new-windows-8-bootloader/){:target="_blank"}. Although there are lots of guides out there for installing Ubuntu on a machine, there isn't a lot of info for some special cases for Windows 8. For example, there's lot of support out there if you want to install Ubuntu on your primary drive (eg, the C drive), but not very much for installing it on a secondary drive. Although this doesn't seem like a big deal, this is kind of bad considering the rise of SSDs and their falling prices; a quick google search about SSD sales brought up an [article from Forbes](https://www.forbes.com/sites/jasonevangelho/2013/04/21/crunching-the-numbers-should-you-buy-a-hybrid-ssd/#2848787936c9){:target="_blank"} about considering a hybrid drive. Regardless, the big takeaway is that it's becoming more popular to have a small boot drive with a much larger drive or personal home server for documents and media, so it's not unheard of to want to install another OS on a secondary drive.

That said, this post will walk you through how to install Ubuntu on a secondary hard drive. If you want to install Ubuntu on a partition of your primary drive, check out the [Ubuntu dual booting community](https://help.ubuntu.com/community/WindowsDualBoot){:target="_blank"} for some helpful guides and tips.

<!--more-->

Note: As I started writing this post, it looks like the Ubuntu community came out with [a guide to install Ubuntu on a Windows 8 machine using UEFI firmware](https://help.ubuntu.com/community/UEFI){:target="_blank"}. This may prove useful for some people, but it still doesn't address the question of booting up Ubuntu on a second disk.

## Prerequisites

First, [you'll need to download Ubuntu](http://www.ubuntu.com/download/desktop){:target="_blank"}. There's usually two types of releases: a release with the latest features which is supported for 18 months, and a "long-term support" release, which is "guaranteed support for five years" from some date. As of the date of this post, Ubuntu 12.10 is the release with the latest features, and Ubuntu 12.04 is the release with long-term support from April 2012. I chose Ubuntu 12.04, for what it's worth. Be sure to download the appropriate architecture (ie, 32 bit or 64 bit).

Once you've downloaded the "iso" file (which is basically a CD/DVD image file), you'll want to put the iso image onto some type of removable media such as a CD/DVD or a USB flash drive. There's nice guides on the Ubuntu community website which detail how to do this: you can create a CD/DVD with [this guide](https://help.ubuntu.com/community/BurningIsoHowto){:target="_blank"}, or you can create a bootable USB stick using [this guide](https://help.ubuntu.com/community/Installation/FromUSBStick){:target="_blank"}. I tried the CD route, but it failed, so I ultimately made a bootable Ubuntu USB flash drive. To create the bootable stick, you'll need a  (preferably empty) flash drive with at least 2GB of space. The guide prompts you to download and install a tool called Link Live, aka LiLi. Running LiLi is pretty straightforward: you choose a USB stick, select the recently downloaded ISO file, choose the size of persistent data (I chose 0, since I was just using it as an installation stick and not a permanent OS), and then click the lightning button. The process takes a few minutes, but worked flawlessly for me.

Once you've completed these steps, you should now have a bootable flash drive with which you can try Ubuntu and/or install it!

## Back up your data!

This should go without saying, but it's always worth repeating: back up your data!  The next step involves playing with partitions, which can be dangerous if you click the wrong buttons, so it's important to make sure that you have a copy of your data somewhere that's safe, preferably on a separate removable drive of some sort.

## Resize/partition your secondary drive

Next, we'll need to make room for your brand new Ubuntu installation. We can do that by creating a new partition on your hard drive. It's important that you use Windows' partitioning tool instead of Ubuntu's partitioning tool. I rushed ahead with my installation and tried resizing an existing partition on my second disk using Ubuntu's partitioning tool. It took hours to complete, and changed the partition table such that the resized partition changed formats from NTFS (the Windows-style file system format) to Linux swap area. In other words, my data was lost. Luckily I had an old backup which had most of my data, but I did lose some of my newer data because I was too complacent to back up my data before the installation.

First, open up the "Disk Management" tool on Windows. In Windows 8, you can find this tool by searching "disk", selecting the "Settings" category, and selecting the "Create and format hard disk partitions". In Windows 7, I think you can search for "disk" or "disk management tool". Once the tool is open, select the disk on which you wish to install Ubuntu; if your disk has multiple partitions, select the partition you want to resize. Right click the selected disk/partition, and select "Shrink volume". This will bring up the following window:
IMAGE HERE
The windows shows the total size of the disk/partition, the size that's available to shrink (ie, unused space), the amount to shrink by, and then the leftover space. You'll be asked to select the amount of space to shrink (in MB), which is basically asking, how large do you want your Ubuntu installation to be?  You'll need at least 8 GB for the base Ubuntu installation, and another 5-7 GB for drivers, packages, and CUDA. My ubuntu installation currently takes up around 20 GB, which includes (minimal) data, but I gave it 100 GB in total. I would recommend to at least dedicate 32 GB for the new partition, but of course that amount is very malleable based on your needs.

Once you have entered in the "amount of space to shrink in MB", you are ready to shrink. A word of warning: <b>shrinking a partition can take a long time</b>. I shrank a 720 GB partition to 620 GB using Ubuntu's partitioning tool, and the process took around 4 hours. I believe the process takes less time with the Windows tool, but I haven't tested that out. Either way, be prepared to have a lot of down time during this stage.

Once the partition has been successfully shrunk, you're ready to move on to the next step!

## Adjust the boot order

Next, you'll want to change your boot order, so that your computer tries to boot from your USB drive before trying the hard disk. This step varies by machine, but is still very similar for all users.

First, restart your computer, and try to enter the BIOS. This is usually done by pressing one of the function keys (eg, F1, F2, etc) during the start-up messages. Some machines also accept "Escape" to enter a menu from which the user can enter the BIOS.

Once you're in the BIOS, use the arrow keys to find the "Boot Device" options. Generally, these options are in a "Boot" menu, but they can also be hidden in other places. Once you have found the Boot Device options, follow the on-screen instructions to change the boot priority of USB disks/drives. Usually, you can change the boot priority of a device using the Enter key.

Once you've changed the priorities, save your changes and exit the BIOS. Generally, there's a function key that will do this for you; this command is usually listed at the bottom of the BIOS. Now you're ready to install Ubuntu!

Stay tuned for the continuation of this post, which includes installing Ubuntu, setting up the bootloader, and booting into Ubuntu for the first time!

Update: I'll be writing a series of posts on installing multiple distributions of Linux on a single machine, so I'll try to integrate this post into that.