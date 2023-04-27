FROM node:16.19-alpine

WORKDIR /app

# install dependencies
COPY package*.json .
COPY yarn.lock .
ENV NODE_ENV=development
RUN yarn install && yarn install --production=false

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]