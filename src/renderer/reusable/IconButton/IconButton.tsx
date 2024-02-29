import React, { createRef, useEffect, RefObject } from 'react';
import './IconButton.css'

const IconButton = ( props: {
  icon: string,
  width: number,
  height: number,
  onclick: () => void,
  color: string,
  onMouseColor: string,
  enableColor: string,
  enableSignal: boolean,
}) => {

  const IconButtonRef: RefObject<HTMLDivElement> = createRef();
  const IconButtonIconRef: RefObject<HTMLDivElement> = createRef();

  useEffect(()=>{
    if (props.width) {
      IconButtonRef.current!.style.width = `${props.width}px`;
    }
    if (props.height) {
      IconButtonRef.current!.style.height = `${props.height}px`;
    }
    if (props.icon) {
      IconButtonIconRef.current!.setAttribute("style", `
        -webkit-mask: url(${props.icon}) no-repeat center / contain;
        height: 90%;
        width: 90%;
        margin: auto;
        transition: background-color 0.5s;
      `);
    }
    if (props.enableSignal) {
      IconButtonIconRef.current!.style.backgroundColor = props.enableColor|| "red";
    } else {
      IconButtonIconRef.current!.style.backgroundColor = props.color || "#333333";
    }
    IconButtonRef.current!.onclick = () => {
      props.onclick!();
    }
    if (!props.enableSignal) {
      IconButtonRef.current!.onmouseover = () => {
        IconButtonIconRef.current!.style.backgroundColor = props.onMouseColor || "red";
      }
      IconButtonRef.current!.onmouseleave = () => {
        IconButtonIconRef.current!.style.backgroundColor = props.color || "#333333";
      }
    } else {
      IconButtonRef.current!.onmouseover = () => {};
      IconButtonRef.current!.onmouseleave = () => {};
    }

  })

  return (
    <div className="IconButton" ref={IconButtonRef}>
      <div className="IconButtonIcon" ref={IconButtonIconRef}>
      </div>
    </div>
  )
}


export default IconButton;
