# old - use docker compose

docker build -f ./dockerfiles/Deploy.Dockerfile -t nathansuss/vue_app:production vue_app

docker run -p 80:80 vue_app:production

docker push nathansuss/vue_app:production
