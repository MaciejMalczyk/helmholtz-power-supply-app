import React, { createRef, useEffect, RefObject, useState } from 'react';
import Store from '../../store/Store.tsx';
import Store from '../../store/State.tsx';
import './NumberInput.css'


const NumberInput = ( props: {
  color: string,
  unit: string,
  width: number,
  height: number,
  max: number,
  min: number,
  step: number,
  param: State,
}) => {

  const NumberInputRef: RefObject<HTMLDivElement> = createRef();
  const NumberInputValueRef: RefObject<HTMLDivElement> = createRef();
  const NumberInputUnitRef: RefObject<HTMLDivElement> = createRef();

  const [valueInput, setValueInput] = useState(0.0);

  useEffect(()=>{

    window.addEventListener(props.param.event, ()=>{
      setValueInput(props.param.value);
    })

    if (props.value) {
      NumberInputValueRef.current!.innerText = `${props.value}`;
    }
    if (props.color) {
      NumberInputRef.current!.style.backgroundColor = props.color;
    }
    if (props.unit) {
      NumberInputUnitRef.current!.innerText = `${props.unit}`;
    }
    if (props.width) {
      NumberInputRef.current!.style.width = `${props.width}px`;
    }
    if (props.height) {
      NumberInputRef.current!.style.height = `${props.height}px`;
    }
    NumberInputRef.current!.style.fontSize = `${((props.height/2.5 > 12) ? props.height/2.5 : 12)}px`;
    NumberInputValueRef.current!.style.fontSize = `${((props.height/2.5 > 12) ? props.height/2.5 : 12)}px`;
  })

  return (
    <div className="NumberInput" ref={NumberInputRef}>
      <input
        type="number"
        min={props.min || 0}
        max={props.max || 20}
        step={props.step || 0.001}
        className="NumberInputValue"
        value={valueInput}
        onChange={(el) => {
          let stepDigits = (el.target.step.toString().split('.')[1] || "").length;
          if (el.target.value <= Number(el.target.max) && el.target.value >= Number(el.target.min)) {
            if ((el.target.value.toString().split('.')[1] || "").length <= stepDigits) {
              if (el.target.value.toString().length < 4+stepDigits) {
                setValueInput(el.target.value);
                props.param.setValue(el.target.value);
              }
            }
          }
        }}
        ref={NumberInputValueRef}
      />
      <div className="NumberInputUnit" ref={NumberInputUnitRef}>
      </div>
    </div>
  )
}


export default NumberInput;
