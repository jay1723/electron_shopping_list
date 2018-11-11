const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron; // Pulls out of Electron

let mainWindow; // Represents the main window (window 1 out of 2)

// Listens for app

app.on('ready', function(){
  // Create window
  mainWindow = new BrowserWindow({});
  // Link HTML
  mainWindow.loadURL(url.format({ 
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Quit app 
  mainWindow.on('closed', function(){
    app.quit();
  });
   // Make menu
   const mainMenu = Menu.buildFromTemplate(template);
   // Insert menu
   Menu.setApplicationMenu(mainMenu);
});

function addWindow() {
  let addWin;
  // Create window
  addWin = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add shopping list item'
  });
  // Link HTML
  addWin.loadURL(url.format({ 
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Small optimization
  addWin.on('close', function(){
    addWin = null;
  })
}

// Creates Menu
const template = [
  {
    label: "File",
    submenu: [
      {
        label: 'Add Item',
        click(){
          addWindow();
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        // This allows for Keyboard shortcuts to be used for quitting
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', 
        click(){
          app.quit(); 
        }
      }
    ]
  }
];

if (process.platform == 'darwin'){
  template.unshift({});
}

// Add developer tools if not in production
if (process.env.NODE_ENV != 'production'){
  template.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        // focused window is required because dev tools need to show up on the window that is currently being operated on
        click(item, focusedWindow){ 
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}