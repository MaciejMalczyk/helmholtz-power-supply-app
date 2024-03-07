import React, { useRef, useEffect, useState } from 'react';
import CoilMid from '../../../assets/svg/CoilMid.svg';
import CoilLarge from '../../../assets/svg/CoilLarge.svg';
import CoilSmall from '../../../assets/svg/CoilSmall.svg';
import CoilsValues from './CoilsValues';
import Store from '../store/Store';
import './Coils.css';

function Coils() {
  const [smallVoltage, setSmallVoltage] = useState(0.0);
  const [smallAmperage, setSmallAmperage] = useState(0.0);
  const [midVoltage, setMidVoltage] = useState(0.0);
  const [midAmperage, setMidAmperage] = useState(0.0);
  const [largeVoltage, setLargeVoltage] = useState(0.0);
  const [largeAmperage, setLargeAmperage] = useState(0.0);

  const CoilsCoilMidRef = useRef<HTMLDivElement>(null);
  const CoilsCoilLargeRef = useRef<HTMLDivElement>(null);
  const CoilsCoilSmallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener(Store.smallVoltageValue.event, () => {
      setSmallVoltage(Store.smallVoltageValue.value);
    });
    window.addEventListener(Store.smallAmperageValue.event, () => {
      setSmallAmperage(Store.smallAmperageValue.value);
    });
    window.addEventListener(Store.midVoltageValue.event, () => {
      setMidVoltage(Store.midVoltageValue.value);
    });
    window.addEventListener(Store.midAmperageValue.event, () => {
      setMidAmperage(Store.midAmperageValue.value);
    });
    window.addEventListener(Store.largeVoltageValue.event, () => {
      setLargeVoltage(Store.largeVoltageValue.value);
    });
    window.addEventListener(Store.largeAmperageValue.event, () => {
      setLargeAmperage(Store.largeAmperageValue.value);
    });

    CoilsCoilMidRef.current!.setAttribute(
      'style',
      `
      -webkit-mask:  url(${CoilMid}) no-repeat center / contain;
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(130deg, #cacaf1 , #535e8c 80%);
      background-size: 100% 500%;
      transition: background 0.5s;
      background-position: 0 ${100 - (midVoltage * midAmperage) / 1.2}%;
    `,
    );

    CoilsCoilLargeRef.current!.setAttribute(
      'style',
      `
      -webkit-mask:  url(${CoilLarge}) no-repeat center / contain;
      width: 100%;
      height: 100%;
      background-color: #008280;
      position: absolute;
      background: linear-gradient(130deg, #aae7e4 , #008280 80%);
      background-size: 100% 500%;
      transition: background 0.5s;
      background-position: 0 ${100 - (largeVoltage * largeAmperage) / 1.2}%;
    `,
    );
    CoilsCoilSmallRef.current!.setAttribute(
      'style',
      `
      -webkit-mask:  url(${CoilSmall}) no-repeat center / contain;
      width: 100%;
      height: 100%;
      background-color: #c22600;
      position: absolute;
      background: linear-gradient(310deg, #dfa195 , #c22600 80%);
      background-size: 100% 500%;
      transition: background 0.5s;
      background-position: 0 ${(smallVoltage * smallAmperage) / 1.2}%;
    `,
    );
  });

  return (
    <div className="CoilsBackground">
      <div className="CoilsContainer">
        <div className="CoilsCoilMid" ref={CoilsCoilMidRef} />
        <div className="CoilsCoilLarge" ref={CoilsCoilLargeRef} />
        <div className="CoilsCoilSmall" ref={CoilsCoilSmallRef} />
        <div className="CoilsValueSmall">
          <CoilsValues
            voltage={smallVoltage}
            amperage={smallAmperage}
            color="#dfa195"
          />
        </div>
        <div className="CoilsValueMid">
          <CoilsValues
            voltage={midVoltage}
            amperage={midAmperage}
            color="#cacaf1"
          />
        </div>
        <div className="CoilsValueLarge">
          <CoilsValues
            voltage={largeVoltage}
            amperage={largeAmperage}
            color="#aae7e4"
          />
        </div>
      </div>
    </div>
  );
}

export default Coils;
