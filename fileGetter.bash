#!/bin/bash
IFS=' '
for FILE in ./assets/*;
	do echo $FILE;
	vars=( $FILE )
	echo ${vars[1]}
	echo "${FILE##*.}"
	mv "$FILE" "./assets/${vars[1]}.${FILE##*.}"
done