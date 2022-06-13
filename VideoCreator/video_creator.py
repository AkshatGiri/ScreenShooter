# The purpose of this script is to take a series of 
# pictures and convert it into video
#
# Prerequisites:
# - python3
# - ffmpeg installed on machine
#
# How the script works -  
# This script takes in a folder path a command line argument
# looks for all 0.jpg pictures recursively in that folder
# sorts the images based on the time created
# create a txt file with paths to all sorted images ( frames for ffmpeg )
# passes the txt file to ffmpeg to create a video
# 
# sample command = 
# python3 video_creator.py /Users/akshatgiri/Documents/ScreenShooter/4-15-2020 0 

import glob
import os
import sys
from pathlib import Path
import cProfile, pstats, io

# Uncomment to profile the function
# @profile
def main():    
    # only works for macos for now
    def get_documents_path():
        return f"{str(Path.home())}/Documents"

    def get_output_folder_path():
        return get_documents_path() + "/ScreenShooter/Finals"

    if len(sys.argv) < 3:
        raise Exception('Screenshots folder path and screen number are required.')

    folder_path = sys.argv[1]
    folder_name = os.path.basename(folder_path)
    print(f"Searching in folder {folder_name}...")

    screen_number = int(sys.argv[2])

    # loading images from this folder
    files = glob.glob(folder_path + f'/**/{screen_number}.jpg', recursive=True)
    files.sort(key=lambda x: os.path.getmtime(x))

    # making sure output folder exists
    Path(get_output_folder_path()).mkdir(exist_ok=True)

    # write a file with all image paths
    print("Write a file with frames for ffmpeg")
    video_frames_file = f'{folder_name}_{screen_number}.txt'

    try:
        # write file with all images as frames
        with open(video_frames_file, 'w') as f:
            for file in files:
                # duration 0.125 is 8 frames per second.
                f.write(f'file \'{file}\'\nduration 0.125\n')
            # According to docs the last frame needs to be written twice, second time without a duration
            f.write(f'file \'{file}\'')

        # Using written file with frames to make a video with ffmpeg
        output_file = get_output_folder_path() + "/" + folder_name + f' screen {screen_number + 1}.mp4'
        os.system(f'ffmpeg -y -f concat -safe 0 -i \'{video_frames_file}\' -vsync vfr -pix_fmt yuv420p "{output_file}"')
    except Exception as e:
        print(e)
    finally:
        # delete the text file
        os.remove(video_frames_file)
        print("Done")


# Run main function 
if __name__ == "__main__":
    main()


def profile(fnc):
    
    """A decorator that uses cProfile to profile a function"""
    
    def inner(*args, **kwargs):
        
        pr = cProfile.Profile()
        pr.enable()
        retval = fnc(*args, **kwargs)
        pr.disable()
        s = io.StringIO()
        sortby = 'cumulative'
        ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
        ps.print_stats()
        print(s.getvalue())
        return retval

    return inner


# SCRATCH PAD

# This ffmpeg command will create a video from a series of images
# The series of images will be in the ffmpeg_input.txt file with each image path and duration for each image.

##
# Example ffmpeg_input.txt file
"""
file 'test/04.43.38 PM/0.jpg'
duration 0.125
file 'test/04.43.38 PM/0.jpg'
"""
##
# ffmpeg -y -f concat -safe 0 -i ffmpeg_input.txt -vsync vfr -pix_fmt yuv420p output.mp4
