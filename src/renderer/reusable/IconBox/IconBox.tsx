import React, { createRef, useEffect, RefObject } from 'react';
import './IconBox.css'

const IconBox = ( props: {
  icon: string, width: number, height: number
}) => {

  const IconBoxRef: RefObject<HTMLDivElement> = createRef();
  const IconBoxIconRef: RefObject<HTMLDivElement> = createRef();

  useEffect(()=>{
    if (props.width) {
      IconBoxRef.current!.style.width = `${props.width}px`;
    }
    if (props.height) {
      IconBoxRef.current!.style.height = `${props.height}px`;
    }
    if (props.icon) {
      IconBoxIconRef.current!.setAttribute("style", `
        -webkit-mask: url(${props.icon}) no-repeat center / contain;
        background-color: #333333;
        height: 90%;
        width: 90%;
        margin: auto;
      `);
    }
  })

  return (
    <div className="IconBox" ref={IconBoxRef}>
      <div className="IconBoxIcon" ref={IconBoxIconRef}>
      </div>
    </div>
  )
}


export default IconBox;
