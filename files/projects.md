---
layout: default
title: Projects
permalink: projects.html
---
# College side projects
{% for project_hash in site.data.projects %}{% assign project = project_hash[1] %}
 - [{{ project.title }}]({{ project.url }}){:target="_blank"} ({{ project.language }}) {% endfor %}