FROM node:12.14.1-alpine3.9

RUN mkdir -p /app
WORKDIR /app
VOLUME /app

RUN apk update && apk add yarn && rm -rf /var/cache/apk/*

COPY package.json package.json
RUN yarn

USER node
CMD ["yarn","start"]
