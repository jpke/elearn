# Instructions from https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:6
EXPOSE 8080
EXPOSE 3000

CMD ["node", "server.js"]
CMD ["npm start"]