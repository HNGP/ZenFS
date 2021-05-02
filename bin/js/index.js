const { app, BrowserWindow, Menu } = require('electron');
const child_proc = require('child_process');
const siftlib = require('../js/siftlib');
const os = require('os');
const fs = require('fs');
var home = os.homedir().replace(/\\/g, '/');
const remote = require('electron').remote;
const { create } = require('domain');
var pathString = home;

function createWindow() {
    let win = new BrowserWindow({ 
        title: 'ZenFS', 
        nodeIntegration: true, 
        icon: "./bin/img/app.png", 
        width: 1200, 
        height: 900, 
        titleBarStyle: 'hiddenInset',
        webPreferences: { experimentalFeatures: true } })
    win.loadFile('./bin/html/main.html')
    const menu = Menu.buildFromTemplate(MenuBarItems)
    Menu.setApplicationMenu(menu)
}
app.on('ready', createWindow)

function createNewFolder(pathString) {
    fs.mkdir(pathString+'/TestFolder', { recursive: true }, (err) => {
        if (err) console.log(err);
    })
};

function addFolderWindow() {
    let win = new BrowserWindow({ 
        title: 'Add New Folder', 
        nodeIntegration: true, 
        width: 500,
        height: 200,
        webPreferences: { experimentalFeatures: true } })
    win.loadFile('./bin/html/newfolder.html')
}


const isMac = process.platform === 'darwin'

const MenuBarItems = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {label: 'New Window',
       click: async () => {
           await createWindow()}
      },
      {label: 'Add Folder',
        click: async () => {
           await addFolderWindow()}
      },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'about' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
        isMac ? { role: 'close' } : { role: 'quit' },
            {label: 'New Window',
             click: async () => {
                 await createWindow()}
            },
            {label: 'Add Folder',
              click: async () => {
                 await addFolderWindow()}
            }
    ]},
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

