# build stage
FROM node:lts-alpine as build-stage
RUN yarn global add http-server
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

CMD [ "yarn", "build" ]