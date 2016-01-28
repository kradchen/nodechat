
FROM centos:7
MAINTAINER KradChen <reinhard1203@163.com>

RUN yum -y update; yum clean all

# install the epel

RUN yum -y install epel-release; yum clean all

# install the nodejs and npm

RUN yum install gcc gcc-c++
RUN curl -sL https://rpm.nodesource.com/setup_4.x | bash -
RUN yum install -y nodejs
RUN node -v
RUN npm install express serve-favicon config morgan async node-minify \
    handlebars lodash walk pm2

ADD . /src

RUN cd /src

EXPOSE 1300


CMD ["node", "/src/app.js"]