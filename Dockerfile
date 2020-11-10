FROM node:14.4-alpine3.11

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/nuxt-app
RUN npm install

RUN npm run build

EXPOSE 3000

ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0
ENV TOKEN_SECRET='638b6755e0b09bd21682636d558cd56ea084eeb2dbaf7fed5dbe1d5d291847ea953d993f8984e8948ead4b4cd12a970123f8fdfc646c119bb84f12c5366164e9'
ENV REFRESH_TOKEN_SECRET='c62b492c7ec3a2e6bde54cb4e86a90dd832f939cb2caec79d776ca9a1f4b3fcd9615bfd6f3ab1ea97ed96c4c325617f80dba493e6b96927aacf5d98c7f83f99c'

CMD ["npm", "start"]