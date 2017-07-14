FROM node:8.1.3
RUN mkdir /watchdocs-frontend
WORKDIR /watchdocs-frontend
ADD package.json /watchdocs-frontend/package.json
RUN npm install
ADD . /watchdocs-frontend
