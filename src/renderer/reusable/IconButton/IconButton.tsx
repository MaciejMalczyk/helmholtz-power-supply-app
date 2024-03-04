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
  enabled: boolean,
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
    if (props.enabled) {
      IconButtonRef.current!.onclick = () => {
        props.onclick!();
      }
      IconButtonRef.current!.style.backgroundColor = "white";
      if (props.enableSignal) {
        IconButtonIconRef.current!.style.backgroundColor = props.enableColor|| "red";
        IconButtonRef.current!.onmouseover = () => {}
        IconButtonRef.current!.onmouseleave = () => {}
      } else {
        IconButtonIconRef.current!.style.backgroundColor = props.color || "#333333";
        IconButtonRef.current!.onmouseover = () => {
          IconButtonIconRef.current!.style.backgroundColor = props.onMouseColor || "red";
        }
        IconButtonRef.current!.onmouseleave = () => {
          IconButtonIconRef.current!.style.backgroundColor = props.color || "#333333";
        }
      }
    } else {
      IconButtonIconRef.current!.style.backgroundColor = props.color;
      IconButtonRef.current!.style.backgroundColor = "#444444";
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
