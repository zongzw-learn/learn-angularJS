FROM centos:7
RUN yum update -y && yum install -y vim git curl sudo bzip2 fontconfig
RUN curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
RUN yum install -y nodejs
COPY install-karma.sh /
RUN chmod +x /install-karma.sh
#RUN /install-karma.sh

