import React from "react";
import "./style.css"

export class Message extends React.Component {
    render() {
        const {text, onMassgeClick} = this.props;
        return (
            <div>
        <span onClick={onMassgeClick}> Message Hello, {text}</span>
            </div>
        );
    }
}
