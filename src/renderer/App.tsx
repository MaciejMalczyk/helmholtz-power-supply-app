import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Coils from './coils/Coils.tsx';
import Controls from './controls/Controls.tsx';
import Store from './store/Store.tsx';



window.electronAPI.onPowerSupplyValues((value) => {
  if (value[0] == "mid") {
    Store['midVoltageValue'].setValue(value[1]);
    Store['midAmperageValue'].setValue(value[2]);
  }
});

function MainGrid() {
  (async () => {
    const res = await window.electronAPI.init("");
    for (let ps in res) {
      Store[`${ps}Enabled`].setValue(res[ps].initEnabled);
      Store[`${ps}VoltageValueSend`].setValue(res[ps].initVoltage);
      Store[`${ps}AmperageValueSend`].setValue(res[ps].initAmperage);
    }
    console.log(res);
  })();

  return (
    <div className="MainGrid">
      <div className="MainGridControls">
        <Controls></Controls>
      </div>
      <div className="MainGridCoils">
        <Coils></Coils>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainGrid></MainGrid>} />
      </Routes>
    </Router>
  );
}
