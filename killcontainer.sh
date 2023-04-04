processes=( $(docker ps -q) )

for process in "${processes[@]}"
do
docker kill ${process}
done