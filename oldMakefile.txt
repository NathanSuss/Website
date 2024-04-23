#############################################################################
# This makefile is mostly just to help me grapple with new syntax and flags #
# by reminding me of things that I have already learned about		    #
#############################################################################

# default message for git push - example: make push MSG="<my unique commit message>"
MSG := another commit 
# convert working directory/project name to lowercase
VERCEL_PROJECT_NAME := $(notdir $(shell pwd | tr '[:upper:]' '[:lower:]'))
VUE_APP_NAME := nathan-programs

# Define ANSI escape codes for colors
GREEN := \033[32m
RED := \033[31m
RESET := \033[0m

push:
	git add -A .
	git commit -m "$(MSG)"
	git pull
	git push

versions:
	node -v 
	npm -v 
	tsc --version

compile.ts:
	npx tsc 

# run docker-compose.yml
start:
	-docker compose up 

# remember to modify name in docker-compose.yml and other Dockerfiles
start-dev:
	-docker compose up $(VUE_APP_NAME)_dev

start-production:
	-docker compose up $(VUE_APP_NAME)_prod

IMAGES := nathansuss/$(VUE_APP_NAME):production \
$(VERCEL_PROJECT_NAME)-$(VUE_APP_NAME)_dev:latest \
vue-helper:latest

clean:
	@echo "$(GREEN)Stop containers$(RESET)"
	-@docker compose down
	@echo "$(GREEN)Remove containers$(RESET)"
	-@yes | docker container prune
	@echo "$(GREEN)Remove volumes$(RESET)"
	-@yes | docker volume prune
	@echo "$(GREEN)Remove images$(RESET)"
	-@docker rmi $(IMAGES)

show:
	-docker images 
	@echo
	-docker ps
	@echo
	-docker volume ls
	@echo
	-docker container ls

vue-helper: clean
	sh Setup.sh
	
