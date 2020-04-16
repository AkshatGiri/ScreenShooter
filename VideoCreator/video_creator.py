# The purpose of this script is to take a series of 
# pictures and convert it into video
#
# This is how it works -  
# This script takes in a folder path a command line argument
# looks for all 0.jpg pictures recursively in that folder
# sorts the images based on the time created
# adds the images to the video creator 1 by 1 to keep the memory
# usage low. And then we get a .mp4 file once the script is finished
# 
# sample command = 
# python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/4-15-2020 

import cv2
import numpy as np
import glob
import os
import sys
from pathlib import Path


# only works for macos for now
def get_documents_path():
    return f"{str(Path.home())}/Documents"

def get_output_folder_path():
    return get_documents_path() + "/ScreenShooter/Finals"

if len(sys.argv) < 2:
    raise Exception('No path to screenshot folder was passed')

folder_path = sys.argv[1]
folder_name = os.path.basename(folder_path)
print(f"Searching in folder {folder_name}...")

# loading images from this folder
# TODO: Add support for creating video of second screen from terminal
files = glob.glob(folder_path + '/**/0.jpg', recursive=True)
files.sort(key=lambda x: os.path.getmtime(x))

# just to set initial values for the video 
img = cv2.imread(files[0])
height, width, layers = img.shape
size = (width,height)
print(width, height)

# making sure output folder exists
Path(get_output_folder_path()).mkdir(exist_ok=True)

# video output
out = cv2.VideoWriter(get_output_folder_path() + "/" + folder_name + ' screen 1.mp4', cv2.VideoWriter_fourcc(*'MP4V'), 8, size)

current_img_processing = 1 # keeps track of how many images have been processed
total_imgs = len(files)

# loads the image using file path, 
# ads the image to the vide0
# moves on to the next image
for filename in files:
    print(f"Processin - {current_img_processing} of {total_imgs}")
    current_img_processing += 1
    img = cv2.imread(filename)
    out.write(img)


out.release()

print("Done")