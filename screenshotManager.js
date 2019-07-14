const fsPromises = require("fs").promises;
const screenshot = require("screenshot-desktop");
const getPath = require("platform-folders");
const format = require("date-fns").format;
const mkdirp = require("mkdirp");

let screenshotTimer;

function screenshotAndSave() {
  screenshot.all().then(imgs => {
    const image_path = `${getPath.getDocumentsFolder()}/${getAppName()}/${getTodayFolderName()}/${getNowFolderName()}`;
    mkdirp(image_path, async () => {
      imgs.forEach(async (img, index) => {
        await fsPromises.writeFile(`${image_path}/${index}.jpg`, img);
      });
      console.log("Screenshots Saved.");
    });
  });
}

function getTodayFolderName() {
  return format(new Date(), "M-D-YYYY");
}

function getNowFolderName() {
  return format(new Date(), "hh.mm.ss A");
}

function getAppName() {
  return "ScreenShooter";
}

function takeScreenshot() {
  screenshotAndSave();
}

function startTakingScreenshots() {
  screenshotTimer = setInterval(() => {
    screenshotAndSave();
  }, 10000);
}

function stopTakingScreenshots() {
  clearInterval(screenshotTimer);
}

module.exports = {
  takeScreenshot,
  startTakingScreenshots,
  stopTakingScreenshots
};
