#! /bin/bash

# Grab wallpaper & set colors

# My daily topography wallpaper
url=https://backend.grant.codes/background/4096/2156/background.png
# Unsplash abstract
# url=https://source.unsplash.com/collection/1368747/4096x2156
# Unsplash earth
# url=https://source.unsplash.com/collection/220381/4096x2156
# Unsplash plants
# url=https://source.unsplash.com/collection/3333421/4096x2156
# Unsplash aerial
# url=https://source.unsplash.com/collection/1166960/4096x2156

bg=~/.config/background.png

wget $url -O $bg

# Gradience for GTK theming
gradience-cli monet -p $bg --theme dark -n grantcodes
gradience-cli apply -n grantcodes --gtk both
# Matugen theming for various applications
matugen image $bg -m "dark"

pkill hyprpaper
hyprpaper &>/dev/null &
sleep 1
hyprctl hyprpaper unload "$bg"

killall ags
ags &
