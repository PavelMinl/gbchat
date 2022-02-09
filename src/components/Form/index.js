import {useEffect, useRef, useState} from "react";
import {Button, TextField} from "@mui/material";

import "./style.css"

export const Form = ({onSubmit}) => {
    const [value, setValue] = useState("");
const textField = useRef()


    const handChange = (e) => {
      setValue(e.target.value);
    };

    const handSubmit = (e) => {
      e.preventDefault();
      onSubmit(value);
      setValue("")
    };

    useEffect(() => {
        textField.current?.focus();
    }, [])

    return (
        <form onSubmit={handSubmit}>
            <TextField value={value} inputRef={textField} onChange={handChange} type="text" />
            <Button className="formBtn" type="submit">Send</Button>
        </form>
    );
};