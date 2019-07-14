const {
  startTakingScreenshots,
  stopTakingScreenshots
} = require("./screenshotManager");

document.querySelector("#take-screenshot").addEventListener("click", () => {
  screenshotAndSave();
  console.log("Taking Screenshot");
});

document.querySelector("#toggle-screenshots").addEventListener("click", () => {
  const button = document.getElementById("toggle-screenshots");
  if (button.innerHTML === "Start") {
    startTakingScreenshots();
    button.innerHTML = "Stop";
  } else {
    stopTakingScreenshots();
    button.innerHTML = "Start";
  }
});

startTakingScreenshots();
