
import './chat.css';
import {useEffect, useRef} from "react";
import {Form} from "../Form";
import {AUTHORS} from "../../utils/constans";
import {MessageList} from "../MessageList";

import {useParams, Navigate} from "react-router-dom";
import {FormWithLogger} from "../FormMui";





export function Chat(messages, addMessage) {

    const params = useParams();
    const { chatId } = params;

    const messageEnd = useRef();

    const handAddMessage = (text) => {
        if (text !== "")
            sendMessage(text,AUTHORS.I)
    };

    const sendMessage = (text, author) => {
        const newMsg ={
            text,
            author,
            id: `message-${Date.now()}`
        }
        addMessage (chatId, newMsg);
    };

    useEffect(() => {
        messageEnd.current?.scrollIntoView();
        let timeout;
        if (messages[chatId]?.[messages[chatId]?.length-1]?.author === AUTHORS.I){
            timeout = setTimeout (() => {
                sendMessage("Hello, I`m bot", AUTHORS.BOT)
            }, 1000)
        };

        return () => {
            clearTimeout(timeout);
        }
    }, [messages]);

    if(!messages[chatId]) {
        return <Navigate to="/chats" replace />
    }

    return (

        <div className="App">
            <div>
                <div className="container">
                    <MessageList message={messages[chatId]}/>
                </div>
                <FormWithLogger onSubmit={handAddMessage} />
            </div>

        </div>
    );
}

export default Chat;
