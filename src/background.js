"use strict";

import { app, protocol, BrowserWindow, Menu, dialog, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let workerWin;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 620,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true
    }
  });

  workerWin = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    workerWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "/worker.html");
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
      workerWin.webContents.openDevTools();
    }
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    workerWin.loadURL("app://./worker.html");
  }

  win.on("closed", () => {
    win = null;
    workerWin = null;
  });

  Menu.setApplicationMenu(null);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// ipcMain 监听和发送相关

ipcMain.on("windowMin", () => {
  win.minimize();
});
ipcMain.on("windowMax", () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});
ipcMain.on("windowClose", () => {
  app.exit();
});

function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === "undefined") {
    console.log("Target Window does not exist");
    return;
  }
  targetWindow.webContents.send(message, payload);
}

// eslint-disable-next-line
ipcMain.handle("exportXLSX", (event, arg) => {
  const path = dialog.showSaveDialogSync({
    title: "导出数据",
    defaultPath: "导出数据.xlsx"
  });
  if (!path) return
  sendWindowMessage(workerWin, "export", {
    path: path,
    data: arg,
    id: win.id
  });
  return true;
});

// eslint-disable-next-line
ipcMain.handle("importXLSX", (event, arg) => {
  const path = dialog.showOpenDialogSync({
    title: "导入数据",
    filters: [{ name: "excel文件", extensions: ["xlsx", "xls"] }],
    properties: ["openFile"]
  });
  if (!path) return;
  sendWindowMessage(workerWin, "import", { id: win.id, path });
  return true;
});
