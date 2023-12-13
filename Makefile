#############################################################################
# This makefile is mostly just to help me grapple with new syntax and flags #
# by reminding me of things that I have already learned about			    #
#############################################################################

# default message for git push - example: make push MSG="<my unique commit message>"
MSG := another commit 

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

# run docker-compose.yml
start:
	-docker compose up 

start-dev:
	-docker compose up vue_app_dev

start-production:
	-docker compose up vue_app_prod

IMAGES := nathansuss/vue_app:production \
website-vue_app_dev:latest \
vue_helper:latest

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
	-docker ps 
	-docker volume ls 
	-docker container ls

vue-helper: clean
	sh Setup.sh
	