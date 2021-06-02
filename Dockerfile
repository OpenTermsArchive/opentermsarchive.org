FROM node:alpine

# install debug packages
RUN apk add nano

# install puppeteer
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/main" >> /etc/apk/repositories \
    && apk upgrade -U -a \
    && apk add \
    nano \
    libstdc++ \
    chromium \
    harfbuzz \
    nss \
    freetype \
    ttf-freefont \
    font-noto-emoji \
    wqy-zenhei \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true


# install app
RUN mkdir -p /usr/src/app

ENV PORT 3000

ARG ENV_FILE=".env.production"

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

# Run install before setting NODE_ENV to install all development modules
RUN yarn

COPY . /usr/src/app
RUN rm .env.*
COPY ./docker/$ENV_FILE /usr/src/app/.env.production

ENV NODE_ENV=production
ENV NODE_OPTIONS='--max_old_space_size=8192'

RUN ls -alh public

RUN yarn build

RUN rm -Rf node_modules
RUN yarn --production

RUN yarn cache clean

EXPOSE 3000
CMD [ "yarn", "start" ]
