FROM node:latest

WORKDIR /app
COPY *.json ./
COPY *.env.* ./
COPY yarn.lock ./

RUN file="$(ls -1 /tmp/dir)" && echo $file

RUN npm i

USER node
