#DOCKER RUN COMMAND
docker container run -e DB='mongodb+srv://oguzhanali:vuak1965xiox123@cluster0.jfxwd.mongodb.net/Capsule?retryWrites=true&w=majority' -e PORT=8080 -e CLIENT='https://nft-marketplace-one-xi.vercel.app' -e KEYFILE='Helloo World' -dp 8080:8080 nft

#DOCKER BUILD COMMAND
docker build -t nft .

#DOCKER CONTAINER REGISTRY - GCP

docker tag 788341ead836 eu.gcr.io/dev-edu/nft
docker push eu.gcr.io/dev-edu/nft
