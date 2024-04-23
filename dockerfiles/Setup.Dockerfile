FROM node:lts-bookworm 

# in case you want to add a named user and group for volume permissions:
# RUN adduser --system --gid <num> --uid <num> <username>

# can also set system wide default privilages given to files and directories (more dangerous)
# RUN umask 777

WORKDIR /Yay
RUN npm install -g @vue/cli

CMD [ "bash" ]
# npm create vue <app name you want, set this in .env file> --default-features vue,typescript