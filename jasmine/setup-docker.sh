#!/bin/bash 

cdir=$(cd `dirname $0`; pwd)
docker rmi --force karma-jasmine:latest
docker build $cdir -t karma-jasmine:latest
if [ $? -ne 0 ]; then 
    echo "failed to create docker image."
    exit 1
fi


