FROM node:21.4.0-bookworm

WORKDIR /nathan-programs

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
