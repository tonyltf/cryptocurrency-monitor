# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Base image
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./packages/api ./packages/api
COPY package.json package-lock.json tsconfig.base.json ./

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build:api

FROM node:18-alpine as remover

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json /usr/src/app/.env* ./
COPY --from=builder /usr/src/app/dist/packages/api ./dist

RUN npm ci

# Running Image
FROM node:18-alpine as running

WORKDIR /usr/src/app

COPY --from=remover /usr/src/app/node_modules ./node_modules
COPY --from=remover /usr/src/app/dist ./dist

EXPOSE 8000

# Start the server using the production build
CMD [ "node", "./dist/main.js" ]
