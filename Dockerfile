#syntax=docker/dockerfile:experimental
FROM node:14-alpine AS builder
ENV NODE_ENV build
WORKDIR /usr/src/app
RUN --mount=type=secret,id=KEYFILE,target=usr/src/app/keyfile.json cat usr/src/app/keyfile.json
COPY . /usr/src/app
RUN yarn
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV production
ENV PORT ${PORT}
ENV DB ${DB}
ENV CLIENT ${CLIENT}
WORKDIR /usr/src/app
RUN apk --no-cache add shadow
RUN groupmod -g 500 node && usermod -u 500 node
COPY --from=builder --chown=node:node /usr/src/app/dist /usr/src/app
COPY --chown=node:node package.json /usr/src/app
COPY --chown=node:node keyfile.json /usr/src/app
RUN yarn --production
USER node
EXPOSE ${PORT}
ENTRYPOINT [ "yarn", "start" ]
