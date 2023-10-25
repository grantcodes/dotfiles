#! /bin/bash

# Grab wallpaper & set colors

# My daily topography wallpaper
url=https://backend.grant.codes/background/4096/2156/background.jpg
# Unsplash abstract
# url=https://source.unsplash.com/collection/1368747/4096x2156
# Unsplash earth
# url=https://source.unsplash.com/collection/220381/4096x2156
# Unsplash plants
# url=https://source.unsplash.com/collection/3333421/4096x2156
# Unsplash aerial
# url=https://source.unsplash.com/collection/1166960/4096x2156

swww query
if [ $? -eq 1 ] ; then
    swww init
    sleep 0.1
fi


wget $url -O ~/.config/background.jpg

wal -c
wal -n -q -e -i ~/.config/background.jpg --backend colorz 

# swww img ~/.config/background.jpg --transition-type grow --transition-fps 60 --transition-duration 1.0 --transition-pos 0.810,0.972 --transition-bezier 0.65,0,0.35,1 --transition-step 255
swww img ~/.config/background.jpg --transition-type outer --transition-fps 60 --transition-duration 1.0 --transition-pos 0,0 

eww reload
