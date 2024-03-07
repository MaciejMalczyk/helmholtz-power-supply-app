import React, { useRef, useEffect } from 'react';
import './NumberDisplay.css';

interface NumberDisplayInterface {
  value: number;
  color: string;
  unit: string;
  width: number;
  height: number;
}

function NumberDisplay({
  value,
  color,
  unit,
  width,
  height,
}: NumberDisplayInterface) {
  const NumberDisplayRef = useRef<HTMLDivElement>(null);
  const NumberDisplayValueRef = useRef<HTMLDivElement>(null);
  const NumberDisplayUnitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== null) {
      NumberDisplayValueRef.current!.innerText = `${value}`;
    }
    if (color) {
      NumberDisplayRef.current!.style.backgroundColor = color;
    }
    if (unit) {
      NumberDisplayUnitRef.current!.innerText = `${unit}`;
    }
    if (width) {
      NumberDisplayRef.current!.style.width = `${width}px`;
    }
    if (height) {
      NumberDisplayRef.current!.style.height = `${height}px`;
    }
    NumberDisplayRef.current!.style.fontSize = `${
      height / 2 > 12 ? height / 2 : 12
    }px`;
  });

  return (
    <div className="NumberDisplay" ref={NumberDisplayRef}>
      <div className="NumberDisplayValue" ref={NumberDisplayValueRef} />
      <div className="NumberDisplayUnit" ref={NumberDisplayUnitRef} />
    </div>
  );
}

export default NumberDisplay;
