import React, { useRef, useEffect } from 'react';
import './IconButton.css';

interface IconButtonInterface {
  icon: string;
  width: number;
  height: number;
  onclick: () => void;
  color: string;
  onMouseColor: string;
  enableColor: string;
  enableSignal: boolean;
  enabled: boolean;
}

function IconButton({
  icon,
  width,
  height,
  onclick,
  color,
  onMouseColor,
  enableColor,
  enableSignal,
  enabled,
}: IconButtonInterface) {
  const IconButtonRef = useRef<HTMLDivElement>(null);
  const IconButtonIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (width) {
      IconButtonRef.current!.style.width = `${width}px`;
    }
    if (height) {
      IconButtonRef.current!.style.height = `${height}px`;
    }
    if (icon) {
      IconButtonIconRef.current!.setAttribute(
        'style',
        `
        -webkit-mask: url(${icon}) no-repeat center / contain;
        height: 90%;
        width: 90%;
        margin: auto;
        transition: background-color 0.5s;
      `,
      );
    }
    if (enabled) {
      IconButtonRef.current!.onclick = () => {
        onclick!();
      };
      IconButtonRef.current!.style.backgroundColor = 'white';
      if (enableSignal) {
        IconButtonIconRef.current!.style.backgroundColor = enableColor || 'red';
        IconButtonRef.current!.onmouseover = () => {};
        IconButtonRef.current!.onmouseleave = () => {};
      } else {
        IconButtonIconRef.current!.style.backgroundColor = color || '#333333';
        IconButtonRef.current!.onmouseover = () => {
          IconButtonIconRef.current!.style.backgroundColor =
            onMouseColor || 'red';
        };
        IconButtonRef.current!.onmouseleave = () => {
          IconButtonIconRef.current!.style.backgroundColor = color || '#333333';
        };
      }
    } else {
      IconButtonIconRef.current!.style.backgroundColor = color!;
      IconButtonRef.current!.style.backgroundColor = '#444444';
    }
  });

  return (
    <div className="IconButton" ref={IconButtonRef}>
      <div className="IconButtonIcon" ref={IconButtonIconRef} />
    </div>
  );
}

export default IconButton;
