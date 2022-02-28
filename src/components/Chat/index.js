
import './chat.css';
import {useEffect, useRef} from "react";
import {Form} from "../Form";
import {AUTHORS} from "../../utils/constans";
import {MessageList} from "../MessageList";

import {useParams, Navigate} from "react-router-dom";
import {FormWithLogger} from "../FormMui";
import {useDispatch, useSelector} from "react-redux";
import {selectMessages} from "../../store/messages/selectors";
import {addMessageWithThunk} from "../../store/messages/actions";





export function Chat() {

    const {chatId} = useParams();
    const messages = useSelector(selectMessages)
 const dispatch = useDispatch()
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
       dispatch(addMessageWithThunk(chatId, newMsg))
    };

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
                    <MessageList message={messages[chatId]}/>
                </div>
                <FormWithLogger onSubmit={handAddMessage} />
            </div>

        </div>
    );
}
