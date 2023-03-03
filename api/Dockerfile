# Base image
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./api .

# Install app dependencies
RUN npm install -g pnpm @nestjs/cli && pnpm install

# Creates a "dist" folder with the production build
RUN pnpm run build:swc

FROM node:18-alpine as remover

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json /usr/src/app/pnpm-lock*.yaml /usr/src/app/.env* ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm i -g pnpm  && pnpm install --only=production

# Running Image
FROM node:18-alpine as running

WORKDIR /usr/src/app

COPY --from=remover /usr/src/app ./

EXPOSE 8000

# Start the server using the production build
CMD [ "node", "dist/main" ]