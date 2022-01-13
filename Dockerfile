FROM node:14-alpine3.12

# install debug packages
RUN apk add nano

# install app
RUN mkdir -p /usr/src/app

ENV PORT 3000

ARG ENV_FILE=".env.production"

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Production use node instead of root
# USER node

# Run install before setting NODE_ENV to install all development modules
RUN npm install

COPY . /usr/src/app
RUN rm .env.*
COPY ./docker/$ENV_FILE /usr/src/app/.env.production

ENV NODE_ENV=production

RUN npm run build

RUN rm -Rf node_modules
RUN npm install --production

RUN npm cache clean --force \
    && rm -rf /var/lib/{apt,dpkg,cache,log}

EXPOSE 3000
CMD [ "npm", "start" ]
