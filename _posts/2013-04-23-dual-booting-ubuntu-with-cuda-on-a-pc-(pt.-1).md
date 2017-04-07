---
layout: post
title: Dual booting Ubuntu with CUDA on a PC (Pt. 1)
date: 2013-04-23
tags: [dual-boot, cuda]
---

Recently for my systems development class, I teamed up with another student to parallelize a decently sophisticated graph using [CUDA](http://www.nvidia.com/object/cuda_home_new.html){:target="_blank"}, a toolkit for GPU programming using an NVIDIA graphics card. Although it was a fun project, and we achieved pretty impressive result despite only working on it for 2 days, it was a <b>huge</b> pain to set up on my Windows 8 laptop. This is the first post of a series that serves as documentation for setting-up Ubuntu on a second (non-bootable) hard drive on a Windows 8 PC which has both integrated graphics and a discrete, NVIDIA graphics card.

<!--more-->

This series of posts will be consist of the following topics in the following posts: \r\n - The machine, and Why I might want CUDA on Ubuntu instead of on Windows?
 - Installing Ubuntu
 - Setting up CUDA on your new Ubuntu installation

I'll update the last few bullet points with links to the posts in which they are discussed once the posts are written.

## The machine

For this project, I used my main laptop. It has the following relevant specs:
 - Intel Core i5 (Ivy Bridge) with integrated graphics
 - 8GB RAM
 - 128GB SSD
 - 720GB Hard Drive
 - NVIDIA GT 630M discrete graphics card

## Why might I want CUDA on Ubuntu instead of on Windows?

You probably don't need Ubuntu to make a parallel program using CUDA. CUDA is actually available for Windows, but its compiler driver (called "nvcc") uses Visual Studio's C++ compiler, cl, instead of g++ or gcc. If you own a Windows machine and want to make a brand new CUDA-based program from scratch, there's no need to install some Linux flavor; there's no major disadvantage or disadvantage to using cl instead of g++ (besides portability issues), and installing Ubuntu is honestly not worth the pain just to get a simple CUDA program up and running.

For my school project, we had an existing C++ 11 project compiled by g++ on an Ubuntu VM. We tried moving the project over to Windows and compiling it in the [mingw](http://mingw.org/){:target="_blank"} environment (<b>CUDA doesn't play nice with Cygwin</b>), but when we were ready to start adding CUDA kernels to the project, we realized that the kernels could only be compiled with cl. It's currently impossible to link together g++ object files with cl object files (although there are some crazy projects which were pretty close), so if you have an existing project, you may have no choice but to install Ubuntu to use CUDA in your project.

So I guess the answer to this question is, it depends. If you have an existing g++ project, you may need to install Ubuntu; otherwise, it's perfectly ok to use cl for a new CUDA project.

Stay tuned for the next post in this series!