import {useState} from "react";

export const Form = ({onSubmit}) => {
    const [value, setValue] = useState("");

    const handChange = (e) => {
      setValue(e.target.value);
    };

    const handSubmit = (e) => {
      e.preventDefault();
      onSubmit(value);
      setValue("")
    };

    return (
        <form onSubmit={handSubmit}>
            <input value={value} onChange={handChange} type="text" />
            <input type="submit" />
        </form>
    );
};