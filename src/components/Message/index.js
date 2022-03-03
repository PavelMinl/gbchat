import React, {useContext} from "react";
import "./style.css"
export const Message = ({ text, author }) => {
    return (
        <div>
      <span>
        {author}: {text}
      </span>
        </div>
    );
};

