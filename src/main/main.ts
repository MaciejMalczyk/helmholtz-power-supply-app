/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { resolveHtmlPath } from './util';
import powerSupplyManager from './powerSupplyManager';
import { devTools } from 'electron-debug';
// import MenuBuilder from './menu';


let mainWindow: BrowserWindow | null = null;

const powerSupplies = {
  small: new powerSupplyManager('192.168.88.201'),
  large: new powerSupplyManager('192.168.88.202'),
  mid: new powerSupplyManager('192.168.88.203'),
};

async function handlePowerSuppliesControl(e, data) {
  console.log(data);
  if (data[1] === 'enable') {
    powerSupplies[data[0]].enable();
    return powerSupplies[data[0]].getEnabled();
  }
  if (data[1] === 'disable') {
    powerSupplies[data[0]].disable();
    return powerSupplies[data[0]].getEnabled();
  }
  if (data[1] === 'set') {
    powerSupplies[data[0]].setVoltage(data[2]);
    powerSupplies[data[0]].setAmperage(data[3]);
  }
}

async function handleInit() {
  interface ReturnDataInterface {
    [key: string]: {
      initVoltage: number;
      initAmperage: number;
      initEnabled: boolean;
      initVisible: boolean;
    };
  }

  const returnData: ReturnDataInterface = {};

  for (const ps of Object.keys(powerSupplies)) {
    if ((await powerSupplies[ps].getEnabled()) === -1) {
      returnData[ps] = {
        initVoltage: 0,
        initAmperage: 0,
        initEnabled: false,
        initVisible: false,
      };
    } else {
      returnData[ps] = {
        initVoltage: await powerSupplies[ps].getSetVoltage(),
        initAmperage: await powerSupplies[ps].getSetAmperage(),
        initEnabled: await powerSupplies[ps].getEnabled(),
        initVisible: true,
      };
    }
  };
  return returnData;
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 600,
    minWidth: 1200,
    minHeight: 600,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  //open devtools
  let devtools = new BrowserWindow();
  mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // hide menu instead of showing one from builder
  mainWindow.setMenu(null);
  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  setInterval(async () => {
    for (const ps of Object.keys(powerSupplies)) {
      if ((await powerSupplies[ps].getVoltage()) >= 0.0) {
        mainWindow.webContents.send('ipc-power-supply-values', [
          ps,
          await powerSupplies[ps].getVoltage(),
          await powerSupplies[ps].getAmperage(),
        ]);
      }
    };
  }, 500);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('ipc-power-supplies-control', handlePowerSuppliesControl);
    ipcMain.handle('ipc-init', handleInit);
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
