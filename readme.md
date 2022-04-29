#DOCKER RUN COMMAND
docker container run --env DB='mongodb+srv://oguzhanali:vuak1965xiox123@cluster0-pri.jfxwd.mongodb.net/Capsule?retryWrites=true&w=majority' --env PORT=8000 --env CLIENT='https://nft-marketplace-one-xi.vercel.app' -dp 8000:8000 nft

#DOCKER BUILD COMMAND
docker build -t nft .

#DOCKER CONTAINER REGISTRY - GCP

docker tag 788341ead836 eu.gcr.io/dev-edu/nft
docker push eu.gcr.io/dev-edu/nft
