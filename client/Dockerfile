FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

# if production then only =production

COPY . .

EXPOSE 3005

RUN npm run build

CMD [ "npm","start" ]



