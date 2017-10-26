# Instructions from https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:6

COPY . . 

EXPOSE 8080

USER node

CMD ["node", "server.js"]

# build this container with:
# docker build -t earnie424/elearn-docker .

# start this container with:
# docker run -p 8080:8080 -it --rm earnie424/elearn-docker:latest

# run this in aws via port 80
# docker run -p 80:8080 -it --rm earnie424/elearn-docker:latest  -https api config
# docker run -p 80:8080 -it --rm earnie424/elearn-docker:http

# push this container to docker cloud
# docker push earnie424/elearn-docker

# see containers running
# docker ps

# stop container
# docker stop containerId