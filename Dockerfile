FROM node:lts-alpine3.12

WORKDIR /usr/app

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
