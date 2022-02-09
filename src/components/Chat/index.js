
import './chat.css';
import {useEffect, useRef, useState} from "react";
import {Form} from "../Form";
import {AUTHORS} from "../../utils/constans";
import {MessageList} from "../MessageList";

import {useParams, Navigate} from "react-router-dom";





export function Chat() {

    const {chatid} = useParams()

    const [messageLi, setMessageLi] = useState({
        1:[],
        2:[],
    });
    const messageEnd = useRef();


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
        setMessageLi ((newMessageLi) => ({
            ...newMessageLi,
[chatid]: [...newMessageLi[chatid], newMes ],
        }));
    };

    useEffect(() => {
        messageEnd.current?.scrollIntoView();
        let timeout;
        if (messageLi[chatid]?.[messageLi[chatid]?.length-1]?.author === AUTHORS.I){
            timeout = setTimeout (() => {
                sendMessage("Hello, I`m bot", AUTHORS.BOT)
            }, 1000)
        };

        return () => {
            clearTimeout(timeout);
        }
    }, [messageLi]);

    if(!messageLi[chatid]) {
        return <Navigate to="/chats" replace />
    }

    return (

        <div className="App">
            <div>
                <div className="container">
                    <MessageList message={messageLi[chatid]}/>
                </div>
                <Form onSubmit={handAddMessage} />
            </div>

        </div>
    );
}

export default Chat;
