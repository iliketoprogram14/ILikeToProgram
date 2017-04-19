---
layout: post
title: Creating a LAMP stack in WSL on Windows
#date: 
tags: [lamp, php, wsl, windows]
image: 
image_alt: 
image_caption: 
description: 
---

 - Update /etc/hosts to include 127.0.1.1
 - sudo apt-get install apache2
 - Configure /etc/apache2/sites-available/000-default.conf
 - sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql
 - sudo mysql_install_db
 - https://superuser.com/questions/1064584/bash-on-ubuntu-on-windows-10-unable-to-connect-to-upstart
 - sudo service mysql restart
 - sudo /usr/bin/mysql_secure_installation
 - Optional: extension mysqli.so in php.ini (/etc/php5/apache2/php.ini)
 - sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt
 - sudo nano /etc/apache2/mods-enabled/dir.conf (add index.php)
 - Install PHP modules (apt-cache search php5-)
 - Restart apache and mysql
 - Point browser to localhost

For existing databases
 - Create the user and grant permissions (https://dev.mysql.com/doc/refman/5.7/en/adding-users.html)
 - mysql -u username -p -e "create database db_name"
 - mysql -u username -p db_name < /path/to/db.sql


 References
  - https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu
  - https://superuser.com/questions/1064584/bash-on-ubuntu-on-windows-10-unable-to-connect-to-upstart