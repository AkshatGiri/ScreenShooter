// packages

// custom imports
const { screenshotAndSave } = require("./screenshotManager");
const { log } = require('./logger');

/////////////////////////
// defining constants
/////////////////////////
const SCREENSHOT_TIME_GAP = 5 * 1000; // screenshot will be taken every this many milliseconds
const STATES = {
  active: "active",
  manual_pause: "manual_pause",
  inactive_pause: "inactive_pause",
};

////////////////////////
// handling app state
////////////////////////
let appState;

function setAppStatus(state) {
  if (STATES[state] == null) {
    log(
      `${state} is not a valid app state. Please check for spelling mistaktes`
    );
    return;
  }

  appState = state;
  // update the label for app state
  document.getElementById("app-state-label").innerHTML = `App State - ${appState}`;
}

///////////////////////////
// handling button events
///////////////////////////
document.querySelector("#take-screenshot").addEventListener("click", () => {
  screenshotAndSave();
});

document.querySelector("#toggle-screenshots").addEventListener("click", () => {
  const button = document.getElementById("toggle-screenshots");
  if (button.innerHTML === "Start") {
    setAppStatus(STATES.active);
    button.innerHTML = "Pause";
  } else {
    setAppStatus(STATES.manual_pause);
    button.innerHTML = "Start";
  }
});


function main(){
  // take action based on current app state
  switch (appState) {
    case STATES.active:
      screenshotAndSave();
      break;
    case STATES.manual_pause:
    // app was manaually paused
    case STATES.inactive_pause:
    // app was paused due to mouse inactivity
    default:
      break;
  }

  // TODO: check if app state needs to be updated
}

// interval for checkign app status
let timer = setInterval(main, SCREENSHOT_TIME_GAP);


// calling main function manually start the app as soon as the script loads
setAppStatus(STATES.active)
main();