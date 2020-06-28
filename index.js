const url = require('url')
const path = require('path')
const robot = require("robotjs");
const { app, BrowserWindow, ipcMain, systemPreferences } = require('electron')
const os = require('os');

async function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 400,
    height:160,
    transparent: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  var micAccess = false
  try {
    if (os.platform() !== "darwin") {
      micAccess = true;
    }

    const status = await systemPreferences.getMediaAccessStatus("microphone");
    console.log("Current microphone access status:", status);

    if (status === "not-determined") {
      const success = await systemPreferences.askForMediaAccess("microphone");
      log.info("Result of microphone access:", success.valueOf() ? "granted" : "denied");
      micAccess = success.valueOf();
    }

    micAccess = status === "granted";
  } catch (error) {
    console.log("Could not get microphone permission:", error.message);
  }
  if (micAccess) {
    // and load the index.html of the app.
    win.setAutoHideMenuBar(true);
    win.setAlwaysOnTop(true, 'floating');
    win.loadURL(url.format ({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}

ipcMain.on('clap', (event, arg) => {
  console.log("👏");
  if (os.platform() === 'win32') {
    robot.typeString(":clap:");
  }
  else {
    robot.typeString("👏");
  }
  robot.keyTap('enter')
});

app.whenReady().then(createWindow)
