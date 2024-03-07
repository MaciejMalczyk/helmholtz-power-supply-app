import { MessageHandler } from '../main/preload';

declare global {
  interface Window {
    // eslint-disable-next-line no-unused-vars
    ipc_power_supplies: MessageHandler;
  }
}

export {};
