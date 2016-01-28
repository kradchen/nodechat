FROM centos:7
MAINTAINER KradChen <reinhard1203@163.com>

RUN yum -y update; yum clean all

# install the epel

RUN yum -y install epel-release; yum clean all

# install the nodejs and npm

RUN yum -y install \
      nodejs \
      npm ; \
    yum -y clean all
RUN node -v
RUN npm install express serve-favicon config morgan async node-minify \
    handlebars lodash walk pm2

ADD . /src

RUN cd /src

EXPOSE 1300


CMD ["node", "/src/app.js"]