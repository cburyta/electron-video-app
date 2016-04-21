Reference
=========

- http://electron.atom.io/#get-started

Setup
=====

    # if using nodeenv to install nodejs
    nodeenv --node=5.10.1 --prebuilt env
    . ./env/bin/activate
    npm install && npm start

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
