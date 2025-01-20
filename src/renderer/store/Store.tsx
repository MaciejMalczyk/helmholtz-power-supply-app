import State from './State';

interface StoreInterface {
  [key: string]: any;
}

const Store: StoreInterface = {
  midVoltageValue: new State(0.0),
  midAmperageValue: new State(0.0),
  largeVoltageValue: new State(0.0),
  largeAmperageValue: new State(0.0),
  smallVoltageValue: new State(0.0),
  smallAmperageValue: new State(0.0),
  midVoltageValueSend: new State(0.0),
  midAmperageValueSend: new State(0.0),
  largeVoltageValueSend: new State(0.0),
  largeAmperageValueSend: new State(0.0),
  smallVoltageValueSend: new State(0.0),
  smallAmperageValueSend: new State(0.0),
  midEnabled: new State(false),
  largeEnabled: new State(false),
  smallEnabled: new State(false),
  midVisible: new State(false),
  largeVisible: new State(false),
  smallVisible: new State(false),
  midSend: new Event("midSend"),
  largeSend: new Event("largeSend"),
  smallSend: new Event("smallSend")
};

export default Store;
