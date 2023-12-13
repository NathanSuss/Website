docker build  \
    -f ./dockerfiles/Dev.Dockerfile \
    -t vue_app:dev 
    vue_app

docker run \
    -v ~/Website/vue_app:/vue_app \
    -p 8080:8080 \
    -it vue_app:dev
