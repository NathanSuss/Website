FROM node:21-bookworm

WORKDIR /nathan-programs

RUN npm install webgl-utils --save-dev
RUN npm install typescript --save-dev

# working on this
# RUN npm install -g @vue/tsconfig -D


# compile typescript on change (watch) - run in background
RUN npx tsc -w &

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
