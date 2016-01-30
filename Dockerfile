FROM ubuntu:trusty
MAINTAINER KradChen <reinhard1203@163.com>
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
RUN node -v
RUN npm install express serve-favicon  morgan ejs body-parser \
    cookie-parser less-middleware

ADD . /src

WORKDIR /src
RUN ls -a
COPY /bin/ /
COPY /routes/ /
COPY app.js /
COPY package.json /
COPY /views/ /
RUN ls -a
RUN cd /bin/
RUN ls -a
EXPOSE 3000


CMD echo hello world
