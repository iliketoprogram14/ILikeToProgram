---
layout: default
title: Archive
permalink: archive.html
---

# Archive
{% for post in site.posts %} - {{ post.date | date: "%b %d, %Y" }} - [{{ post.title }}]({{ post.url }})
{% endfor %}