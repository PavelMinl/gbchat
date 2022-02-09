import {Message} from "../Message";


export const MessageList = ({message}) =>
    message.map ((message ) => (
        <Message key={message.id} text={message.text} author={message.author}/>
    ));