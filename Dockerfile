FROM node:21.4.0-bookworm

WORKDIR /app

COPY . .

#TODO change this to npm ci (continuous integration install) when you are ready to deploy
RUN npm install

EXPOSE 6060

CMD [ "npm", "run", "serve" ]