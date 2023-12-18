#! /bin/bash

killall waybar
waybar
killall swaync-client
swaync

sh ./background.sh
