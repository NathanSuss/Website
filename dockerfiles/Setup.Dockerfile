FROM node:21-bookworm

WORKDIR /vue-setup

RUN npm install -g @vue/cli
RUN npm install -g webgl-utils --save-dev

# https://blog.logrocket.com/how-to-use-vue-3-typescript/#using-vue-typescript
# https://www.digitalocean.com/community/tutorials/typescript-new-project#step-1-starting-the-typescript-project
RUN npm install -g typescript --save-dev

# working on this
# RUN npm install -g @vue/tsconfig -D

# The following commands ensure access to our files in the volume externally.
# If we left them out, changing files on our local setup
# would fail due to insufficient permissions. 
RUN userdel -r node
ARG USER_ID
ARG GROUP_ID
RUN addgroup --gid $GROUP_ID user
RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID user

# Set the active user and open the interactive terminal
USER user
ENTRYPOINT [ "bash" ]


# make app:
# npx @vue/cli create <app-name>
# cd typescript-app
# npm run serve
