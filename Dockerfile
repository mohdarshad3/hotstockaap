FROM nginx
MAINTAINER Alexey Melnikov <alexey@watstock.com>


# update the repository sources list
# and install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \    
    build-essential


# Node 7
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - \
    && apt-get install -y nodejs


# Configure Nginx
COPY ./nginx /etc/nginx


# Copy project files
COPY . /usr/share/nginx/html


# Build project
WORKDIR /usr/share/nginx/html/master

# install peer dependencies
RUN npm install angular chartist jshint

# install gulp
RUN npm install gulp -g

# install npm dependecies
RUN npm i

# install bower
RUN npm install -g bower

# install bower dependencies
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN bower install

# build the project
RUN gulp build


# set default working dir
WORKDIR /usr/share/nginx/html


# open HTTP 80 port
EXPOSE 80
