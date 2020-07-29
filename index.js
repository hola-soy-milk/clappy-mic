const url = require('url');

const path = require('path');
const robot = require('robotjs');
const {app, BrowserWindow, ipcMain, systemPreferences} = require('electron');
const os = require('os');

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 360,
    height: 200,
    transparent: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let micAccess = false;
  try {
    if (os.platform() !== 'darwin') {
      micAccess = true;
    }

    const status = await systemPreferences.getMediaAccessStatus('microphone');
    if (status === 'not-determined') {
      const success = await systemPreferences.askForMediaAccess('microphone');
      micAccess = success.valueOf();
    }

    micAccess = status === 'granted';
  } catch (error) {
    console.error('Could not get microphone permission:', error.message);
  }
  if (micAccess) {
    // and load the index.html of the app.
    win.setAutoHideMenuBar(true);
    win.setAlwaysOnTop(true, 'floating');
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
}

ipcMain.on('clap', () => {
  console.log('👏');
  if (os.platform() === 'win32') {
    robot.typeString(':clap:');
  } else {
    robot.typeString('👏');
  }
  robot.keyTap('enter');
});

app.whenReady().then(createWindow);
