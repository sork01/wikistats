#!/bin/bash

if [ "$1" == "" ]; then
	echo 'no file given yo'
	exit
fi

echo 'click dat window yo'
window=$(xwininfo | grep -Po 'Window id: 0x[^\s]+' | grep -Po '0x[^\s]+')
while true; do inotifywait -e modify $1; xdotool key --window $window F5; done
