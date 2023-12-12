#############################################################################
# This makefile is mostly just to help me grapple with new syntax and flags #
# by reminding me of things that I have already learned about			    #
#############################################################################

# default message for git push - example: make push MSG="<my unique commit message>"
MSG := another commit 

# does not contain all flags, just the commmon cluttery ones
DOCKER_FLAGS := -v $(pwd):/home/Website -w /home/Website -p 1234:1234


# build docker image  and name it nathan-programs_i (_i = image)
# docker build <name:<optional>tag is nathan-programs_i> <tell `build` the location of Dockerfile containing image blueprint>
docker-build:
	docker build -t nathan-programs_i .

# --rm remove the container when it stops
# -it allow me to run terminal commands in the container
# -v mount my current directory to the container
# -w specify working directory of container
# -p specify local host mapping from docker containers local host to this local host
# --name name the container

# run an interactive local docker container that will be removed when stopped
docker-run-temp:
	docker run --rm -it $(DOCKER_FLAGS) --name nathan-programs_c nathan-programs_i

# -d run in detached mode. No longer reliant on my terminal, becomes a background process
# --restart when my computer powers down and restarts, this container will automatically restart too (every time it is stopped it will restart)
# -v mount my current directory to the container
# -w specify working directory of container
# -p specify local host mapping from docker containers local host to this local host
# --name name the container

# run a background docker container that will persist until manually destroyed
docker-run:
	docker run -d --restart $(DOCKER_FLAGS) --name nathan-programs_c nathan-programs_i

# useful for destroying a container with the --restart flag
docker-delete:
	docker rm nathan-programs_c

docker-list-images:
	docker images

docker-list-processes:
	docker ps

docker-stop:
	docker stop nathan-programs_c

docker-start:
	docker start nathan-programs_c

docker-debug:
	docker logs nathan-programs_c > temp_debug.txt
	docker inspect nathan-programs_c >> temp_debug.txt

push:
	git add -A .
	git commit -m "$(MSG)"
	git pull
	git push

versions:
	node -v 
	npm -v 
