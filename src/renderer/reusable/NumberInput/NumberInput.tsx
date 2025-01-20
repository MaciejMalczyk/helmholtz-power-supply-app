import React, { useRef, useEffect, useState } from 'react';
import State from '../../store/State';
import './NumberInput.css';

interface NumberInputInterface {
  color: string;
  unit: string;
  width: number;
  height: number;
  max: number;
  min: number;
  step: number;
  param: State;
}

function NumberInput({
  color,
  unit,
  width,
  height,
  max,
  min,
  step,
  param,
}: NumberInputInterface) {
  const NumberInputRef = useRef<HTMLDivElement>(null);
  const NumberInputValueRef = useRef<HTMLInputElement>(null);
  const NumberInputUnitRef = useRef<HTMLDivElement>(null);

  const [valueInput, setValueInput] = useState(0.0);
  const [valueChanged, setValueChanged] = useState(false);

  function eventListenerFunction() {
    setValueInput(param!.value);
    console.log(param);
  }

  useEffect(() => {
    window.addEventListener(param!.event, eventListenerFunction);

    if (valueChanged == false) {
      console.log(valueChanged);
      NumberInputRef.current!.style.backgroundColor = color;
      NumberInputValueRef.current!.style.backgroundColor = color;
    } else {
      console.log(valueChanged);
      NumberInputRef.current!.style.backgroundColor = "pink";
      NumberInputValueRef.current!.style.backgroundColor = "pink";
    }
    if (unit) {
      NumberInputUnitRef.current!.innerText = `${unit}`;
    }
    if (width) {
      NumberInputRef.current!.style.width = `${width}px`;
    }
    if (height) {
      NumberInputRef.current!.style.height = `${height}px`;
      NumberInputRef.current!.style.fontSize = `${
        height / 2.5 > 12 ? height / 2.5 : 12
      }px`;
      NumberInputValueRef.current!.style.fontSize = `${
        height / 2.5 > 12 ? height / 2.5 : 12
      }px`;
    }

    return () => {
      window.removeEventListener(param!.event, eventListenerFunction);
    }
  });

  return (
    <div className="NumberInput" ref={NumberInputRef}>
      <input
        type="number"
        min={min || 0}
        max={max || 20}
        step={step || 0.001}
        className="NumberInputValue"
        value={valueInput}
        onChange={(el) => {
          const stepDigits = (el.target.step.toString().split('.')[1] || '')
            .length;
          if (
            Number(el.target.value) <= Number(el.target.max) &&
            Number(el.target.value) >= Number(el.target.min)
          ) {
            if (
              (el.target.value.toString().split('.')[1] || '').length <=
              stepDigits
            ) {
              if (el.target.value.toString().length < 4 + stepDigits) {
                setValueInput(Number(el.target.value));
                param!.setValue(el.target.value);
                setValueChanged(true);
              }
            }
          }
        }}
        ref={NumberInputValueRef}
      />
      <div className="NumberInputUnit" ref={NumberInputUnitRef} />
    </div>
  );
}

export default NumberInput;
