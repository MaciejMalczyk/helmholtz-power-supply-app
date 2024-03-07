import React, { useRef, useEffect } from 'react';
import './IconBox.css';

interface IconBoxInterface {
  icon: string;
  width: number;
  height: number;
}

function IconBox({ icon, width, height }: IconBoxInterface) {
  const IconBoxRef = useRef<HTMLDivElement>(null);
  const IconBoxIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (width) {
      IconBoxRef.current!.style.width = `${width}px`;
    }
    if (height) {
      IconBoxRef.current!.style.height = `${height}px`;
    }
    if (icon) {
      IconBoxIconRef.current!.setAttribute(
        'style',
        `-webkit-mask: url(${icon}) no-repeat center / contain;
        background-color: #333333;
        height: 90%;
        width: 90%;
        margin: auto;
      `,
      );
    }
  });

  return (
    <div className="IconBox" ref={IconBoxRef}>
      <div className="IconBoxIcon" ref={IconBoxIconRef} />
    </div>
  );
}

export default IconBox;
