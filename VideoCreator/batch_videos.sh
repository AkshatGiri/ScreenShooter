#!/bin/bash
# change month to the month you want
MONTH=10
# change numbers to the dates that yoou want to cover
for i in {1..31}
do
  echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  echo "-------------------------------------------------------------------------"
  python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2020 0
  echo "-------------------------------------------------------------------------"
  python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2020 1
  echo "-------------------------------------------------------------------------"
  python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/$MONTH-$i-2020 2
done