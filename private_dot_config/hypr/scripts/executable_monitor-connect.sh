#!/bin/bash

restart_ags() {
  echo "Monitor changed, attempting to restart ags" 
  pkill ags
  sleep 2 
  ags &
}

disable_laptop_screen() {
  echo "Disabling laptop screen"
  # hyprctl keyword monitor "desc:AU Optronics 0xD291, disable"
  hyprctl keyword monitor "desc:BOE 0x0BCA, disable"
}

enable_laptop_screen() {
  echo "Enabling laptop screen"
  hyprctl keyword monitor "desc:AU Optronics 0xD291, preferred, auto, 1.25"
  hyprctl keyword monitor "desc:BOE 0x0BCA, preferred, auto, 1.333333"
}

handle() {
  if [[ $1 == monitoradded* ]]; then
    echo "$1"
    if [[ $1 == *"Samsung Electric Company Odyssey G70B H1AK500000"* ]]; then
      disable_laptop_screen
    fi
    if [[ $1 == *"LG Electronics LG HDR 4K 0x0002DE0C"* ]]; then
      disable_laptop_screen
    fi
    if [[ $1 == *"Samsung Electric Company U32J59x HTPK602414"* ]]; then
      disable_laptop_screen
    fi
    restart_ags
  elif [[ $1 == monitorremoved* ]]; then
    restart_ags
    enable_laptop_screen
  fi
}

# If there were no params passed, watch the socket for changes
if [ $# -eq 0 ]; then
  echo "Monitoring socket for changes"
  socat - "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/${HYPRLAND_INSTANCE_SIGNATURE}/.socket2.sock" | while read -r line; do handle "$line"; done
fi

# If there were params passed, handle them
if [ $# -gt 0 ]; then
  # If the first param is "lidopen", enable the laptop screen
  if [ $1 == "lidopen" ]; then
    enable_laptop_screen
  fi
  # If the first param is "lidclose", disable the laptop screen
  if [ $1 == "lidclose" ]; then
    # But only disable if there is more than one monitor in hyprland
    monitor_count=$(hyprctl monitors -j | jq length)
    if [ $monitor_count -gt 1 ]; then
      disable_laptop_screen
    else
      echo "Not disabling laptop screen as there are no other monitors"
    fi
  fi
fi
