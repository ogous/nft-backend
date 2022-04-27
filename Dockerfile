FROM node:14-alpine AS builder
ENV NODE_ENV build
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY build.ts /app
COPY . /app
RUN yarn
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV production
ENV PORT ${PORT}
ENV DB ${DB}
ENV CLIENT ${CLIENT}
WORKDIR /app
RUN apk --no-cache add shadow
RUN groupmod -g 500 node && usermod -u 500 node
COPY --from=builder --chown=node:node /app/dist /app
COPY --chown=node:node package.json /app
RUN yarn --production
USER node
EXPOSE ${PORT}
ENTRYPOINT [ "yarn", "start" ]
