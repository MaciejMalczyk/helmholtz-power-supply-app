import React, { useState, useEffect } from 'react';
import IconBox from '../reusable/IconBox/IconBox';
import NumberInput from '../reusable/NumberInput/NumberInput';
import IconButton from '../reusable/IconButton/IconButton';
import VoltageIcon from '../../../assets/svg/alpha-v-circle.svg';
import AmperageIcon from '../../../assets/svg/alpha-a-circle.svg';
import ArrowRightIcon from '../../../assets/svg/arrow-right-thick.svg';
import PlayIcon from '../../../assets/svg/play.svg';
import Store from '../store/Store';
import './Controls.css';

function Controls() {
  const [midStatus, setMidStatus] = useState(false);
  const [smallStatus, setSmallStatus] = useState(false);
  const [largeStatus, setLargeStatus] = useState(false);
  const [midVisible, setMidVisible] = useState(false);
  const [smallVisible, setSmallVisible] = useState(false);
  const [largeVisible, setLargeVisible] = useState(false);

  useEffect(() => {
    window.addEventListener(Store.midEnabled.event, function listener() {
      setMidStatus(Store.midEnabled.value);
      //this.removeEventListener(Store.midEnabled.event, listener);
    });
    window.addEventListener(Store.midVisible.event, function listener() {
      setMidVisible(Store.midVisible.value);
      //this.removeEventListener(Store.midVisible.event, listener);
    });
    window.addEventListener(Store.largeEnabled.event, function listener() {
      setLargeStatus(Store.largeEnabled.value);
      //this.removeEventListener(Store.largeEnabled.event, listener);
    });
    window.addEventListener(Store.largeVisible.event, function listener() {
      setLargeVisible(Store.largeVisible.value);
      //this.removeEventListener(Store.largeVisible.event, listener);
    });
    window.addEventListener(Store.smallEnabled.event, function listener() {
      setSmallStatus(Store.smallEnabled.value);
      //this.removeEventListener(Store.smallEnabled.event, listener);
    });
    window.addEventListener(Store.smallVisible.event, function listener() {
      setSmallVisible(Store.smallVisible.value);
      //this.removeEventListener(Store.smallVisible.event, listener);
    });
  });

  return (
    <div className="Controls">
      <div className="ControlsContainer">
        <div className="ControlsVoltage">
          <IconBox icon={VoltageIcon} width={80} height={80} />
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store.midVoltageValueSend}
          />
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store.largeVoltageValueSend}
          />
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store.smallVoltageValueSend}
          />
        </div>
        <div className="ControlsAmperage">
          <IconBox icon={AmperageIcon} width={80} height={80} />
          <NumberInput
            width={160}
            height={80}
            max={10}
            step={0.0001}
            param={Store.midAmperageValueSend}
          />
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param={Store.largeAmperageValueSend}
          />
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param={Store.smallAmperageValueSend}
          />
        </div>
        <div className="ControlsButtons">
          <div className="ControlsButtonsFiller" />
          <div className="ControlsButtonsMid">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              enabled={midVisible}
              onclick={async () => {
                await window.ipc_power_supplies.powerSupplyControlSend([
                  'mid',
                  'set',
                  Store.midVoltageValueSend.value,
                  Store.midAmperageValueSend.value,
                ]);
              }}
            />
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              enableColor="#a1a1f1"
              enableSignal={midStatus}
              enabled={midVisible}
              onclick={async () => {
                if (midStatus === false) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'mid',
                      'enable',
                    ]);
                  await setMidStatus(res);
                } else if (midStatus === true) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'mid',
                      'disable',
                    ]);
                  await setMidStatus(res);
                }
              }}
            />
          </div>
          <div className="ControlsButtonsLarge">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              enabled={largeVisible}
              onclick={async () => {
                await window.ipc_power_supplies.powerSupplyControlSend([
                  'large',
                  'set',
                  Store.largeVoltageValueSend.value,
                  Store.largeAmperageValueSend.value,
                ]);
              }}
            />
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              enableColor="#9cd3d0"
              enableSignal={largeStatus}
              enabled={largeVisible}
              onclick={async () => {
                if (largeStatus === false) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'large',
                      'enable',
                    ]);
                  await setLargeStatus(res);
                } else if (largeStatus === true) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'large',
                      'disable',
                    ]);
                  await setLargeStatus(res);
                }
              }}
            />
          </div>
          <div className="ControlsButtonsSmall">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              enabled={smallVisible}
              onclick={async () => {
                await window.ipc_power_supplies.powerSupplyControlSend([
                  'small',
                  'set',
                  Store.smallVoltageValueSend.value,
                  Store.smallAmperageValueSend.value,
                ]);
              }}
            />
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              enableColor="#e58e7a"
              enableSignal={smallStatus}
              enabled={smallVisible}
              onclick={async () => {
                if (smallStatus === false) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'small',
                      'enable',
                    ]);
                  await setSmallStatus(res);
                } else if (smallStatus === true) {
                  const res =
                    await window.ipc_power_supplies.powerSupplyControlSend([
                      'small',
                      'disable',
                    ]);
                  await setSmallStatus(res);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
