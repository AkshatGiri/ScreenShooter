const { menubar } = require("menubar");

function main() {
  const mb = menubar({
    icon: "./enabled.png",
    preloadWindow: true,
    browserWindow: {
      width: 100,
      height: 100,
      webPreferences: {
        nodeIntegration: true
      }
    }
  });

  mb.on("ready", () => {
    console.log("Starting App");
  });

  // Uncomment to use devtools
  // mb.on("after-create-window", () => {
  //   mb.window.openDevTools();
  // });
}

main();
