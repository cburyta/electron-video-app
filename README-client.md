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

This is to compile locally and run for debugging. After vendors are available, run the following to
start the desktop app.

    npm start

Package / Deliver
=================

Electron seems a bit vague in how to manually package the app, but there are tools such as electron-packager
that allow this to be a bit more automated.

One time install (can be saved to package.json so npm install fetch's)

    npm install --save-dev electron-packager

Run the packager to package

    ./node_modules/.bin/electron-packager . --all

### Note

You'll get OSX / Linux apps when building on OSX, and Windows when running on windows. There are ways to compile both
from OSX - e.g. with Wine via Homebrew installed. See documents for electron-packager for more info.

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

- http://electron.atom.io
- https://github.com/electron-userland/electron-packager

