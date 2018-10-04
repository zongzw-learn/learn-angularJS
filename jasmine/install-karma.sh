#!/bin/bash

(
    cd /
    npm install -g karma-cli
    npm install --save-dev karma phantomjs-prebuilt angular jasmine-core angular-mocks
    npm install --save-dev karma-jasmine karma-coverage karma-phantomjs-launcher
)
