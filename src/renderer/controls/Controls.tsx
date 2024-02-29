import React, { useState, useEffect } from 'react';
import IconBox from '../reusable/IconBox/IconBox.tsx';
import NumberInput from '../reusable/NumberInput/NumberInput.tsx';
import IconButton from '../reusable/IconButton/IconButton.tsx';
import VoltageIcon from '../../../assets/icons/alpha-v-circle.svg';
import AmperageIcon from '../../../assets/icons/alpha-a-circle.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right-thick.svg';
import PlayIcon from '../../../assets/icons/play.svg';
import Store from '../store/Store.tsx';
import './Controls.css'

function Controls() {

  const [midStatus, setMidStatus] = useState(false);
  const [smallStatus, setSmallStatus] = useState(false);
  const [largeStatus, setLargeStatus] = useState(false);

  useEffect(() => {
    window.addEventListener(Store['midEnabled'].event, ()=>{
      setMidStatus(Store['midEnabled'].value);
    })
  });

  return (
    <div className="Controls">
      <div className="ControlsContainer">
        <div className="ControlsVoltage">
          <IconBox
            icon={VoltageIcon}
            width={80}
            height={80}
          ></IconBox>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param='midVoltageValueSend'
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param='largeVoltageValueSend'
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param='smallVoltageValueSend'
          ></NumberInput>
        </div>
        <div className="ControlsAmperage">
          <IconBox
            icon={AmperageIcon}
            width={80}
            height={80}
          ></IconBox>
          <NumberInput
            width={160}
            height={80}
            max={10}
            step={0.0001}
            param='midAmperageValueSend'
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param='largeAmperageValueSend'
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param='smallAmperageValueSend'
          ></NumberInput>
        </div>
        <div className="ControlsButtons">
          <div className="ControlsButtonsFiller">
          </div>
          <div className="ControlsButtonsMid">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              onclick={async ()=>{
                const res = await window.electronAPI.powerSupplyControlSend(["mid", "set", Store['midVoltageValueSend'].value, Store['midAmperageValueSend'].value]);
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              enableColor="#a1a1f1"
              enableSignal={midStatus}
              onclick={async ()=>{
                if (midStatus === false) {
                  const res = await window.electronAPI.powerSupplyControlSend(["mid", "enable"]);
                  setMidStatus(res);
                } else if (midStatus === true) {
                  const res = await window.electronAPI.powerSupplyControlSend(["mid", "disable"]);
                  setMidStatus(res);
                }
              }}
            >
            </IconButton>
          </div>
          <div className="ControlsButtonsLarge">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              onclick={()=>{
                console.log("xd");
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              enableColor="#9cd3d0"
              onclick={()=>{
                console.log("xd");
              }}
            >
            </IconButton>
          </div>
          <div className="ControlsButtonsSmall">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              onclick={()=>{
                console.log("xd");
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              enableColor="#e58e7a"
              onclick={()=>{
                console.log("xd");
              }}
            >
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Controls;
