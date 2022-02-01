i=1
while [ $i -le 4 ]
do
	 curl -X POST -H 'Content-Type: application/json' -d @$i.json $API
	 i=$((i+1))
	 echo $i
done
