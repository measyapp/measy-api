FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add python3 py3-pandas

COPY package.json /usr/src/app

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]