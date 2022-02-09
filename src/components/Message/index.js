import React from "react";
import "./style.css"
import PropTypes from "prop-types";

export class Message extends React.Component {
    render() {
        const {text, author} = this.props;
        return (
            <div>
        <span className="chatText">{author}: {text}</span>
            </div>
        );
    };
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
}