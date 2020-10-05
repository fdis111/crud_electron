const electron = require('electron');
const { ipcMain } = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
const sqlite = require("sqlite3").verbose()
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;




const db = new sqlite.Database(path.join(__dirname, "./db.db"), err => {
    if (err) {
        return console.log(err.message)
    } else{
        console.log("la connection à la base des données a reussit");
    }
}) 



ipcMain.on('get-users', (event) => {
    // console.log(arg) // affiche "ping"
    db.all('SELECT * FROM users', (err, data) => {
        event.reply('asynchronous-reply', (err && err.message) || data);
    })
  })


ipcMain.on('post-user', (event, arg) => {
    db.all(`insert into users (name, email) values ('${arg.name}', '${arg.email}')`, (err, data) => {
        if (err) {
            throw err 
        } else{
            event.reply('asynchronous-reply', data)
        }
    } )
})

ipcMain.on('delete-user', (event, arg) => {
    db.all(`delete from users where id=${parseInt(arg)}`, (err, data) => {
        if (err) {
            throw err
        } else{
            event.reply('asynchronous-reply', data)
        }
    })
})

ipcMain.on('update-user', (event, arg) => {
    db.all(`UPDATE users  SET name = '${arg.name}', email = '${arg.email}'  WHERE id = ${parseInt(arg.id)}`, (err, data) => {
        if (err) {
            throw err
        } else{
            event.reply('asynchronous-reply', data)
        }
    })
})


    
function createWindow() {
  mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        minHeight: 700,
        minWidth: 1100,
        webPreferences: { 
          nodeIntegration: true
        }
  });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
