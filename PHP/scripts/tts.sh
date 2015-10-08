#!/bin/bash
 
EXP=`echo -n $1 | md5sum | awk '{print $1}'`
DIR=cache
 
if [ ! -f $DIR/$EXP.mp3 ]; then
 
wget --user-agent "Mozilla/5.0 (X11; U; Linux i686; fr; rv:1.9.2.13) Gecko/20101206 Ubuntu/10.04 (lucid) Firefox/3.6.13" \
    -O $DIR/$EXP.mp3 \
    "http://translate.google.com/translate_tts?tl=fr&q=$1"
fi
 
mpg321 -g 100 $DIR/$EXP.mp3
#yatm -t 1.3 $DIR/$EXP.mp3