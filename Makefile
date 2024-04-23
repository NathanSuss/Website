#############################################################################
# This makefile is mostly just to help me grapple with new syntax and flags #
# by reminding me of things that I have already learned about		        #
#############################################################################

# imports environment variables from .env
include .env

# default message for git push - example: make push MSG="<my unique commit message>"
MSG := another commit 

# convert working directory/project name to lowercase
VERCEL_PROJECT_NAME := $(notdir $(shell pwd | tr '[:upper:]' '[:lower:]'))

# Define ANSI escape codes for colors
GREEN := \033[32m
RED := \033[31m
RESET := \033[0m

# pick docker-compose service by label - dev default {dev, setup, prod}
SERVICE := dev

SILENCE := > /dev/null 2> /dev/null

push:
	git add -A .
	git commit -m "$(MSG)"
	git pull
	git push

versions:
	node -v 
	npm -v 
	tsc --version

run:
ifeq ($(SERVICE),setup)
	echo running setup
else 
	echo current app named: $(VUE_APP_NAME)
endif
	docker-compose run -p 8080:8080 --rm $(SERVICE)

deploy:
	docker login
	docker build -f ./dockerfiles/Deploy.Dockerfile -t $(DOCKER_USERNAME)/$(VUE_APP_NAME):production $(VUE_APP_NAME)
	docker push $(DOCKER_USERNAME)/$(VUE_APP_NAME):production
	docker run -p 80:80 $(DOCKER_USERNAME)/$(VUE_APP_NAME):production

IMAGES := $(VERCEL_PROJECT_NAME)-setup $(VERCEL_PROJECT_NAME)-$(SERVICE) $(DOCKER_USERNAME)/$(VUE_APP_NAME):production

clean:
	@echo "$(GREEN)Stopping containers$(RESET)"
	-@docker compose down $(SILENCE)
	@echo "$(GREEN)Removing containers$(RESET)"
	-@yes | docker container prune $(SILENCE)
	@echo "$(GREEN)Removing volumes$(RESET)"
	-@yes | docker volume prune $(SILENCE)
	@echo "$(GREEN)Removing images$(RESET)"
	-@docker rmi $(IMAGES) $(SILENCE)
	-@make show 

show:
	-docker images 
	@echo
	-docker ps
	@echo
	-docker volume ls
	@echo
	-docker container ls
	