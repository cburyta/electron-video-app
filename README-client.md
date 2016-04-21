Overview
========

The client is a desktop app that is built with Electron, a tool that packs HTML/JS apps into
native desktop apps. (Similar to hybrid mobile development.)

To work on the app, we use node modules to compile the app.

TL;DR
=====

    npm install && npm start

Setup
=====

    # if using nodeenv to install nodejs
    nodeenv --node=5.10.1 --prebuilt env
    . ./env/bin/activate

    # with node available, run the following to fetch vendor files
    npm install

Compile
=======

    # after vendors are available, run the following to start the desktop app
    npm start

Deactivate (Nodeenv)
====================

When using nodeenv, remember you can use the following command
to deactivate a nodeenv session without closing the current
terminal session.

    deactivate_node


Notes on this repos creation
============================

    # setup Electron
    git clone https://github.com/electron/electron-quick-start
    # re-init the git repo, rename the folder

Reference
=========

- http://electron.atom.io/#get-started

