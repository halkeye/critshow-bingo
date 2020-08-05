#!/bin/sh

if [ -z "$1" ]; then
  echo "./makeicons.sh <originalicon>";
  exit 1
fi

for i in 48 72 96 144 192 512; do
  convert $1 -resize ${i}x${i} icon-${i}x${i}.png;
done
convert -resize x16 -gravity center -crop 16x16+0+0 $1 -flatten -colors 256 -background transparent ../favicon.ico