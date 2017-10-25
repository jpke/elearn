# Instructions from https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:6

COPY . . 

EXPOSE 8080

CMD ["node", "server.js"]