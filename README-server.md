Overview
========

The server is a php app build in Selix, a micro framework to simply serve a video file.

We can use `php -S` to start a server to allow the client to download the video.

Then, we can ensure offline viewing works by shutting the server down.

The index.php has limited end-points, meant to serve the video file. There is a array-database stub that
lists the files available in the `/videos` directory.

TL;DR
=====

    cd app-server
    composer install
    php -S 127.0.0.1:8081 -t .

Working Dir
===========

Make sure the commands below are run inside the `/app-server` directory.

    cd ./app-server

Setup
=====

    # ensure you have composer, e.g. to download the phar version...
    php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
    php -r "if (hash('SHA384', file_get_contents('composer-setup.php')) === '7228c001f88bee97506740ef0888240bd8a760b046ee16db8f4095c0d8d525f2367663f22a46b48d072c816e7fe19959') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"

    # install vendors
    php composer.phar install

Run the server
==============

After vendors are available, run the following to start the web server

    php -S 127.0.0.1:8081 -t .

Test that the video is availalbe at http://127.0.0.1:8081/index.php/get-blob/1

Reference
=========

- https://getcomposer.org/download/
- http://silex.sensiolabs.org/


