FROM node:21.4.0-bookworm

WORKDIR /vue_app

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
