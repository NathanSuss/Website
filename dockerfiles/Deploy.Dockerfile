# build stage
FROM node:21.4.0-bookworm AS build-stage

WORKDIR /nathan-programs

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx AS production-stage

COPY --from=build-stage /nathan-programs/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
