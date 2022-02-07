
import './App.css';
import {Message} from "./components/Message";
import {useEffect, useRef, useState} from "react";
import {Form} from "./components/Form";
import {AUTHORS} from "./utils/constans";
import {MessageList} from "./components/MessageList";
import {List, ListItem} from "@mui/material";

function App() {

    const [messageLi, setMessageLi] = useState([]);
    const messageEnd = useRef();
const chat = [
    {name: "User1", id: "1"},
    {name: "User2", id: "2"},
]

    const handAddMessage = (text) => {
    if (text !== "")
          sendMessage(text,AUTHORS.I)
    };

    const sendMessage = (text, author) => {
        const newMes ={
            text,
            author,
            id: `message-${Date.now()}`
        }
        setMessageLi ((newMessageLi) => [...newMessageLi, newMes ])
    };

    useEffect(() => {
        messageEnd.current?.scrollIntoView();
        let timeout;
        if (messageLi[messageLi.length-1]?.author === AUTHORS.I){
            timeout = setTimeout (() => {
              sendMessage("Hello, I`m bot", AUTHORS.BOT)
            }, 1000)
        };

        return () => {
            clearTimeout(timeout);
        }
    }, [messageLi]);


  return (

    <div className="App">
        <div>
            <List className="chatName">
                {chat.map((chat) =>(
                    <ListItem key={chat.id} > {chat.name}</ListItem>
                ))}
            </List>
        </div>
        <div>
            <div className="container">
        <MessageList message={messageLi}/>
            <div ref={messageEnd}/>
            </div>
          <Form onSubmit={handAddMessage} />
        </div>

    </div>
  );
}

export default App;
