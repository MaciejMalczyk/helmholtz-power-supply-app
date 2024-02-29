import React, { createRef, useEffect, RefObject } from 'react';
import './CoilsValues.css';
import NumberDisplay from '../reusable/NumberDisplay/NumberDisplay.tsx'

const CoilsValues = ( props: {
  voltage: number, amperage: number, color: string;
}) => {
    return (
      <div className="CoilsValuesContainer">
        <div className="CoilsValuesOne">
          <NumberDisplay
            value={props.voltage}
            color={props.color}
            unit="V"
            width={100}
            height={40}
          ></NumberDisplay>
        </div>
        <div className="CoilsValuesTwo">
          <NumberDisplay
            value={props.amperage}
            color={props.color}
            unit="A"
            width={100}
            height={40}
          ></NumberDisplay>
        </div>
      </div>
    )
}

export default CoilsValues;
