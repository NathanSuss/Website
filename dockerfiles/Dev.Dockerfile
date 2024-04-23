FROM node:lts-bookworm

WORKDIR /Yay

# RUN npm install -g webgl-utils
# RUN npm install -g typescript

# compile typescript on change (watch) - run in background
# RUN npx tsc -w &

EXPOSE 8080

# npm run dev was being difficult. 
# It seems the port needs to be exposed in three places (here, dockercompose, makefile)
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080" ]
