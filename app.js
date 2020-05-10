const { menubar } = require("menubar");

function main() {
  const mb = menubar({
    icon: __dirname + "/camera.png",
    preloadWindow: true,
    browserWindow: {
      width: 250,
      height: 150,
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
