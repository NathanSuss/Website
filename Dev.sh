# old - use docker compose

docker build -f ./dockerfiles/Dev.Dockerfile -t nathan-programs:dev nathan-programs

docker run --rm -v ~/Website/nathan-programs:/nathan-programs -p 8080:8080 -it nathan-programs:dev
