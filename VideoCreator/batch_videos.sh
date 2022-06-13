#!/bin/bash
# change month to the month you want
MONTH=5
# change numbers to the dates that yoou want to cover
for i in {1..31}
do
  echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  echo "-------------------------------------------------------------------------"
  python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2022 0
  python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2022 1
  # echo "-------------------------------------------------------------------------"
  # python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2020 2
done