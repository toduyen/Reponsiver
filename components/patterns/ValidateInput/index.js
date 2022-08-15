import React from "react"
import "./style.scss"

export const ValidateInput = class ValidateInput extends React.Component {
    render() {
        return (
            <div className={`validateInputContainer ${this.props.className || ''}`}>
                <input {...this.props} />
                {this.props.validateErr && <p className={`validateErr  ${this.props.classErr || ''}`} style={this.props.styleErr || {}}>{this.props.validateErr}</p>}
            </div>
        )
    }
}
