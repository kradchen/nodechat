FROM ubuntu:trusty
MAINTAINER KradChen <reinhard1203@163.com>
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
RUN node -v
RUN npm install express serve-favicon  morgan ejs body-parser \
    cookie-parser less-middleware debug
ADD ./ src
EXPOSE 3000
WORKDIR /src/bin
RUN nodejs www

CMD ["nodejs","www"]
