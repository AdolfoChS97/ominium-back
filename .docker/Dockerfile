FROM node:20-alpine

RUN apk add --no-cache tzdata

ENV TZ=America/Caracas

COPY package*.json .

WORKDIR /app

RUN npm install

RUN npm install -g @nestjs/cli

EXPOSE 3000/tcp

CMD yarn start:dev