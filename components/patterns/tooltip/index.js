import React from "react"
import "./style.scss"

export const Tooltip = class Tooltip extends React.Component {
  render(){
    const {visible, withOnClick, myRef} = this.props
    return(
      <div {...this.props}  ref={myRef} className={`vth-tooltip ${this.props.arow ? this.props.arow : ''} ${this.props.className}`}>
        {this.props.children}
        <div style={{...this.props.bodyStyle, ...withOnClick && {visibility: visible ? "visible" : "hidden"}}} className="tooltiptext">{this.props.text}</div>
      </div>
    )
  }
}
