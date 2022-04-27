#DOCKER RUN COMMAND
docker container run --env DB='mongodb+srv://oguzhanali:vuak1965xiox123@cluster0.jfxwd.mongodb.net/Capsule?retryWrites=true&w=majority' --env PORT=8000 --env CLIENT='https://nft-marketplace-one-xi.vercel.app/' -dp 8000:8000 nft

#DOCKER BUILD COMMAND
docker build -t nft2 .
