
import './chat.css';
import {useEffect, useRef, useState} from "react";
import {Form} from "../Form";
import {AUTHORS} from "../../utils/constans";
import {MessageList} from "../MessageList";

import {useParams, Navigate} from "react-router-dom";
import {FormWithLogger} from "../FormMui";
import {useDispatch, useSelector} from "react-redux";
import {selectMessages} from "../../store/messages/selectors";
import {addMessageWithThunk} from "../../store/messages/actions";
import {
    getMessageListRefByChatId,
    getMessageRefById,
    getMessagesRefByChatId,
} from "../../services/firebase";
import {
    onChildAdded,
    onChildRemoved,
    onValue,
    push,
    set,
} from "@firebase/database";




export function Chat() {

    const {chatId} = useParams();
    const [messages, setMessages] = useState ([]);
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
        set(getMessageRefById (chatId, newMsg.id), newMsg);
    };


    useEffect(() => {
        const unsubscribe = onValue(getMessagesRefByChatId(chatId), (snapshot) => {
            if (!snapshot.val()?.empty) {
                setMessages(null);
            }
        });

        return unsubscribe;
    }, [chatId]);

    useEffect(() => {
        const unsubscribe = onChildAdded(
            getMessageListRefByChatId(chatId),
            (snapshot) => {
                console.log(snapshot.val());
                setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
            }
        );

        return unsubscribe;
    }, [chatId]);

    useEffect(() => {
        const unsubscribe = onChildRemoved(
            getMessageListRefByChatId(chatId),
            (snapshot) => {
                console.log(snapshot.val());
                setMessages((prevMessages) =>
                    prevMessages.filter(({ id }) => id !== snapshot.val()?.id)
                );
            }
        );

        return unsubscribe;
    }, [chatId]);

    useEffect(() => {
        messageEnd.current?.scrollIntoView();
    }, [messages]);

    if (!messages[chatId]) {
        return <Navigate to="/chats" replace />;
    }


    return (

        <div className="App">
            <div>
                <div className="container">
                    <MessageList message={messages}/>
                </div>
                <FormWithLogger onSubmit={handAddMessage} />
            </div>

        </div>
    );
}
