import React, { createRef, useEffect, RefObject } from 'react';
import './NumberDisplay.css'

const NumberDisplay = ( props: {
  value: number, color: string, unit: string, width: number, height: number
}) => {

  const NumberDisplayRef: RefObject<HTMLDivElement> = createRef();
  const NumberDisplayValueRef: RefObject<HTMLDivElement> = createRef();
  const NumberDisplayUnitRef: RefObject<HTMLDivElement> = createRef();

  useEffect(()=>{
    if (props.value !== null) {
      NumberDisplayValueRef.current!.innerText = `${props.value}`;
    }
    if (props.color) {
      NumberDisplayRef.current!.style.backgroundColor = props.color;
    }
    if (props.unit) {
      NumberDisplayUnitRef.current!.innerText = `${props.unit}`;
    }
    if (props.width) {
      NumberDisplayRef.current!.style.width = `${props.width}px`;
    }
    if (props.height) {
      NumberDisplayRef.current!.style.height = `${props.height}px`;
    }
    NumberDisplayRef.current!.style.fontSize = `${((props.height/2 > 12) ? props.height/2 : 12)}px`;
  })

  return (
    <div className="NumberDisplay" ref={NumberDisplayRef}>
      <div className="NumberDisplayValue" ref={NumberDisplayValueRef}>
      </div>
      <div className="NumberDisplayUnit" ref={NumberDisplayUnitRef}>
      </div>
    </div>
  )
}


export default NumberDisplay;
