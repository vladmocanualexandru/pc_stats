/**
 * Import require packages
 */
const  { app, BrowserWindow } = require('electron');

/**
 * Initialize variable
 */
let homeWindow;

app.on('ready', createHomeWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});

app.on('activate', () => {
    if(homeWindow == null) {
        createHomeWindow();
    }
});


 /**
  * @function createHomeWindow
  */
function createHomeWindow(){

    homeWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
          }
    });

    homeWindow.on('close',() => {
        homeWindow = null;
    })

    homeWindow.loadFile('build/index.html');
 }