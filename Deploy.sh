# old - use docker compose

docker build -f ./dockerfiles/Deploy.Dockerfile -t nathansuss/nathan-programs:production nathan-programs

docker run -p 80:80 nathan-programs:production

docker push nathansuss/nathan-programs:production
