// packages
const electron = require("electron");
// custom imports
const { screenshotAndSave } = require("./screenshotManager");
const { log } = require("./logger");

const screen = electron.screen || electron.remote.screen;

/////////////////////////
// defining constants
/////////////////////////
const SCREENSHOT_TIME_GAP = 10 * 1000; // screenshot will be taken every this many milliseconds

// key and value must be same
const STATES = {
  active: "active",
  manual_pause: "manual_pause",
  inactive_pause: "inactive_pause",
};

// if the cursor hasn't moved in this many screenshots, we'll put the app in inactive_pause state
const NUM_OF_SCREENSHOTS_BEFORE_IDLE = 4;

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
  log(`App state changed to - ${appState}`)
  // update the label for app state
  document.getElementById(
    "app-state-label"
  ).innerHTML = `App State - ${appState}`;

  if(appState === STATES.manual_pause){
    clearCursorPositions();
  }
}

///////////////////////////
// handling button events
///////////////////////////
document.querySelector("#take-screenshot").addEventListener("click", () => {
  screenshotAndSave();
});

document.querySelector("#toggle-screenshots").addEventListener("click", () => {
  const button = document.getElementById("toggle-screenshots");
  if (appState !== STATES.active) {
    setAppStatus(STATES.active);
    button.innerHTML = "Pause";
  } else {
    setAppStatus(STATES.manual_pause);
    button.innerHTML = "Start";
  }
});

///////////////////////////////
// Acitivity / Inactivity checks
///////////////////////////////
cursorPositions = [];
function checkForInactivity() {
  updateCursorPositions();
  // if all positions in cursorPositions array are equal
  // that means the user is inactive and we should stop taking
  // screenshots
  if (hasPoisitionChanged() === false) {
    setAppStatus(STATES.inactive_pause);
  }
}

function checkForActivity() {
  updateCursorPositions();
  // if the app was in inactive_pause state
  // we will check if the cursos has moved since then
  // and move it to active state if it has
  if (hasPoisitionChanged()) {
    setAppStatus(STATES.active);
  }
}

function updateCursorPositions() {
  const pos = screen.getCursorScreenPoint();
  cursorPositions.push(pos);
  if (cursorPositions.length > NUM_OF_SCREENSHOTS_BEFORE_IDLE) {
    cursorPositions.shift(); // removes the first element from array
  }
}

function hasPoisitionChanged() {
  if (cursorPositions.length < NUM_OF_SCREENSHOTS_BEFORE_IDLE) {
    return true;
  }
  const basePos = cursorPositions[0];
  for (let pos of cursorPositions) {
    if (pos.x !== basePos.x || pos.y !== basePos.y) {
      return true;
    }
  }
  return false;
}

function clearCursorPositions() {
  cursorPositions = [];
}

///////////////////////////
// Starting the app
//////////////////////////
function main() {
  // take action based on current app state
  switch (appState) {
    case STATES.active:
      screenshotAndSave();
      checkForInactivity();
      break;
    case STATES.manual_pause:
      // app was manaually paused
      break;
    case STATES.inactive_pause:
      // app was paused due to mouse inactivity
      checkForActivity();
      break;
    default:
      break;
  }
}

// interval for checkign app status
let timer = setInterval(main, SCREENSHOT_TIME_GAP);

// calling main function manually start the app as soon as the script loads
setAppStatus(STATES.active);
main();