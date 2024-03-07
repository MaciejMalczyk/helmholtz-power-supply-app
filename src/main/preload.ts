// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

const messageHandler = {
  powerSupplyControlSend: (data) =>
    ipcRenderer.invoke('ipc-power-supplies-control', data),
  onPowerSupplyValues: (callback) =>
    ipcRenderer.on('ipc-power-supply-values', (_event, value) =>
      callback(value),
    ),
  init: (data) => ipcRenderer.invoke('ipc-init', data),
};

contextBridge.exposeInMainWorld('ipc_power_supplies', messageHandler);

export type MessageHandler = typeof messageHandler;
