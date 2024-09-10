# syntax=docker/dockerfile:1

ARG NODE_VERSION=16.20.2
# ARG NODE_VERSION=18.20.2

FROM node:${NODE_VERSION} AS base
RUN yarn config set cache-folder /root/.yarn
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn,id=yarn \
    yarn install --production=false --frozen-lockfile --cache-folder /root/.yarn
COPY . .
EXPOSE 3001