#!/bin/bash

# Get the version from the grunt output
read version;
echo version=$version;
rm "./output.txt";

# Add and update the changed files
git status
git add .
git status
git commit -m "bumping version $version"

# merge in the changed files from gh-pages
git checkout master
git checkout gh-pages angular-pusher.js angular-pusher.min.js README.md bower.json package.json
git commit -m "merging $version"

# tag the version
git tag -a "$version" -m "$version"

# push changes and tags to master
git push origin master
git push origin master --tags