# Instructions from https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:6

COPY . . 

EXPOSE 8080

USER node

CMD ["node", "server.js"]

# build this container with:
# docker build -t elearn-docker .

# start this container with:
# docker run -p 8080:8080 -it --rm elearn-docker