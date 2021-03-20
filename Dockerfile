FROM node:lts-alpine

RUN apk update && apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache verify && npm cache clean --force

RUN npm install

RUN openssl req -nodes -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365 -subj /C=PH/ST=MANILA/L=MNL/O=TEAM/OU=OFFICE/CN=*.com

COPY . ./

ENV START_CMD ${START_CMD}
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD ["npm run", ${START_CMD}]