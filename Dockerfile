FROM    centos:7
MAINTAINER KradChen <reinhard1203@163.com>
RUN yum install gcc gcc-c++
RUN curl -sL https://rpm.nodesource.com/setup_4.x | bash -
RUN yum install -y nodejs
RUN node -v
RUN npm install express -gd
RUN npm install express 
CMD ["/bin/bash"]