#!/bin/sh


handle() {
  case $1 in monitoradded*)
    echo "Monitor connected, attempting to restart ags"
    pkill ags
    sleep 2 
    ags &
  esac
}

socat - "UNIX-CONNECT:/tmp/hypr/${HYPRLAND_INSTANCE_SIGNATURE}/.socket2.sock" | while read -r line; do handle "$line"; done