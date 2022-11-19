python3 parse1-kor.py
python3 parse1-eng.py
python3 parse1-2-kor.py
python3 parse1-2-eng.py
python3 parse2-kor.py
python3 parse2-eng.py

i=0
while [ $i -le 71 ]
do
	 curl -X POST -H 'Content-Type: application/json' -d @$i.json $API
	 i=$((i+1))
	 echo $i
done

