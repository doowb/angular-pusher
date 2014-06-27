#!/bin/bash

# configure my git info
git config --global user.name "Brian Woodward"
git config --global user.email "brian.woodward@gmail.com"

# re-add the remote and get all the branches
git remote remove origin
git remote add origin git@github.com:doowb/angular-pusher.git
git fetch --all

# make sure we're on the correct branch
git checkout gh-pages