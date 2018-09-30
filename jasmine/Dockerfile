FROM centos:7
RUN yum update -y && yum install -y vim git curl sudo
RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
RUN yum install -y nodejs
RUN npm install angular --save
RUN npm install -g karma --save-dev
RUN npm install karma-jasmine jasmine-core --save-dev
RUN npm install angular-mocks --save-dev
RUN npm install -g bower
RUN bower install jasmine-jquery --save --allow-root
RUN bower install karma-read-json --allow-root
RUN npm install karma-coverage
RUN npm install karma-jquery --save-dev
