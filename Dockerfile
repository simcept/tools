FROM node:10-alpine

WORKDIR /usr/src/app

COPY express/ ./
COPY vue/dist ./public
RUN npm install && \
    chown --recursive node:node .

USER node

EXPOSE 3000
CMD [ "npm", "start" ]
