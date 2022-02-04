
import './App.css';
import {Message} from "./components/message";
import {useEffect, useState} from "react";
import {Form} from "./components/form";
import {AUTHORS} from "./utils/constans";

function App() {

    const [messageLi, setMessageLi] = useState([
        { text : "hello", author: AUTHORS.I},
        { text : "I am BOT", author: AUTHORS.BOT},
    ]);
    const handMessageClick = () => {
        console.log("test");
    };

    const handAddMessage = (text) => {
        const newMes ={
            text,
            author: AUTHORS.I,
        }
        setMessageLi ((newMessageLi) => [...newMessageLi, newMes ])
    };

    useEffect(() => {
        if (messageLi[messageLi.length-1].author === AUTHORS.I){
            const newMes ={
                text: "I AM BOT",
                author: AUTHORS.ME,
            };
            setMessageLi ((newMessageLi) => [...newMessageLi, newMes ])
        };
    }, [messageLi]);


  return (

    <div className="App">
      <div className="App-header">
          {messageLi.map ((message ) => (
        <Message text={message.text} onMessageClick={handMessageClick}  />
          ))}
          <Form onSubmit={handAddMessage} />
      </div>
    </div>
  );
}

export default App;
