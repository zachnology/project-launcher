const { app, BrowserWindow, Tray } = require('electron');

const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  const icon = new Tray ('./public/icons/icon.png');
  mainWindow = new BrowserWindow({
    icon: './public/icons/icon.png',
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

console.log(app);
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})