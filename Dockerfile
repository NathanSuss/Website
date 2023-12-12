FROM node:21.4.0-bookworm

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 1234

CMD [ "node", "app.js" ]