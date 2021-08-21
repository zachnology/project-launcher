const { app, BrowserWindow, Menu } = require('electron');

const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
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

  createMenu();

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

function createMenu() {

  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
              {label:'Home',
                click(){
                  console.log("Navigate to Home");
                  mainWindow.webContents.send('goToHome');

                }
            
              },
              {label:'About',                 
              
               click(){
                console.log("Navigate to About");
                mainWindow.webContents.send('goToAbout');
              }},
              {label:'Exit',                 
               click() { 
                app.quit() 
              }}
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 
}

console.log(app);
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})