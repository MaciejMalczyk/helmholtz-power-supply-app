import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Coils from './coils/Coils';
import Controls from './controls/Controls';
import Store from './store/Store';

window.ipc_power_supplies?.onPowerSupplyValues(
  (value: [string, number, number]) => {
    if (value[0] === 'mid') {
      Store.midVoltageValue.setValue(value[1]);
      Store.midAmperageValue.setValue(value[2]);
    } else if (value[0] === 'large') {
      Store.largeVoltageValue.setValue(value[1]);
      Store.largeAmperageValue.setValue(value[2]);
    } else if (value[0] === 'small') {
      Store.smallVoltageValue.setValue(value[1]);
      Store.smallAmperageValue.setValue(value[2]);
    }
  },
);

function MainGrid() {
  (async () => {
    const res = await window.ipc_power_supplies?.init('');
    Object.keys(res).forEach((ps) => {
      Store[`${ps}Visible`].setValue(res[ps].initVisible);
      Store[`${ps}Enabled`].setValue(res[ps].initEnabled);
      Store[`${ps}VoltageValueSend`].setValue(res[ps].initVoltage);
      Store[`${ps}AmperageValueSend`].setValue(res[ps].initAmperage);
    });
  })();

  return (
    <div className="MainGrid">
      <div className="MainGridControls">
        <Controls />
      </div>
      <div className="MainGridCoils">
        <Coils />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainGrid />} />
      </Routes>
    </Router>
  );
}
