# Screen Shooter
This project is a way to capture your screen and your work throughout the day without killing your laptop's memory or cpu. 

## How it works? 
This app lives in your app bar on top on macos and bottom app bar on windows. When it's running it will take screenshots of your screens every 10 seconds and save it to a folder. Later these images will be combined using the python script and made into a video. 

### How to get started? 
First part of the program is written using electron and nodejs. So install nodejs using nvm and then install electron.  

To start the app run  
 `electron app.js`

To get the video creator to work you would need these python dependencies, 

- python3
- numpy
- opencv2

Once the day is over you can run the python script using the following command  
`python3 VideoCreator/video_creator.py {folder_path}`