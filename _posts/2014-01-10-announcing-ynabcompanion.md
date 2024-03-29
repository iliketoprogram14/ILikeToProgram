---
layout: post
title: Announcing YNABcompanion
date: 2014-01-10
tags: [windows-phone, ynab]
image: https://upload.wikimedia.org/wikipedia/commons/3/32/You_Need_A_Budget_Logo.png
image_alt: YNAB logo
image_caption: By <a href="https://commons.wikimedia.org/wiki/File%3AYou_Need_A_Budget_Logo.png">Jesse Mecham of YNAB</a>
description: Created an unreleased Windows Phone app in C# for YNAB with limited features.
---

After graduating from college this past year, I wanted to get my ducks in a row and start off life in the real world on a good financial foot. I ended up spending a lot of time on [the personal finance subreddit](http://reddit.com/r/personalfinance){:target="_blank"}, where a lot of people recommended (among other things) a budgeting app called [YNAB](http://ynab.com){:target="_blank"}, or "You Need A Budget". Ever since, I've been hooked on the desktop app because of its ease of use and its built-in ability to interface with Dropbox.

Unfortunately, there was no YNAB app for Windows Phone, and being a Windows Phone user, I had to manually add transactions on my laptop or desktop instead of being able to add them as soon as they happen on my phone. That was the motivation for YNABcompanion.

<!--more-->

The app works by enabling users to manually add all transactions and transfers and compare the amounts against budgeted amounts, with the goal that users will eventually save enough to "live off of last month's income." The hard part, of course, is manually adding transactions to the app. To that end, the folks behind YNAB have mobile apps for iOS and Android.

Ultimately, YNABcompanion is a very simple transactions manager app that interfaces specifically with Dropbox and YNAB. The app only took about a week and a half of development time (most of which was dedicated to resolving issues caused by my ignorance of the platform, which I'll address in later posts), but it's a pretty effective app to help track transactions for YNAB.

Side note: I'm very interested in developing a full-featured YNAB Windows Phone app which can sync directly with YNAB's database, but I'll need to figure out how the database works first before I start development. In the meantime, I think YNABcompanion is a good stop-gap until then.

Back on topic, YNABcompanion is optimally used in the following way:

1. Export your budget and transaction history to Dropbox, and import the exported files into YNABcompanion. This is easily done with a click of a button in each app. This is optional, but only needs to be done once if the user chooses to do so. This is recommended so that YNABcompanion will save account names and budget category names to (a) make adding transactions easy and (b) ensure that YNABcompanion transactions can be correctly imported into YNAB later on.
2. Add a transaction or transfer. Users can edit and delete transactions/transfers, and can also save new accounts or new budget categories when adding transactions to YNABcompanion.
3. When you're ready to sync the transactions to YNAB, export the transactions to Dropbox, and import them into each account in YNAB. Again, this is easily done with a click of a button in each app. The exported transactions are cleared from the app, so that users can never export transactions twice.
4. Repeat steps two and three as needed.

Again, this is a simple app, but it's pretty effective at addressing the goal of adding transactions on the go for YNAB (without directly syncing with YNAB).

You can learn more about the app [here]({{ site.data.projects['ynabcompanion'].url }}). The app's currently in certification, but I'll update this post and the project page with the link as soon as it's approved. I hope YNAB/Windows Phone users find this app useful (until I finish the real YNAB app)!

Update: I ended up revoking the app from certification.  Reverse engineering YNAB's structure was a bit more of a PITA than I had hoped.  I've also moved away from Windows Phone, so I'm no longer developing this app.