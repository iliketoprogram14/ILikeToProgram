---
layout: default
title: Projects
permalink: projects.html
---
# College side projects
{% for project_hash in site.data.projects %}{% assign project = project_hash[1] %}
 - [{{ project.title }}]({{ project.url }}){:target="_blank"} {% if project.spec != nil %}- [Spec]({{ project.spec }}){:target="_blank"} {% endif %}({{ project.language }}) {% endfor %}