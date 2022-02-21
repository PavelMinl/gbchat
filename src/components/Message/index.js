import React, {useContext} from "react";
import "./style.css"
import {ThemeContext} from "../../utils/ThemeContext";

export const Message = ({ text, author }) => {
    const { messageColor } = useContext(ThemeContext);
    return (
        <div>
      <span className="chatText" style={{ color: messageColor }}>
        {author}: {text}
      </span>
        </div>
    );
};

/*
Message.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
}*/
