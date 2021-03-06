import {Message} from "../Message";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {deleteMessage, editMessage} from "../../store/messages/actions";
import {getMessageRefById} from "../../services/firebase";
import {remove} from "@firebase/database";


export const MessageList = ({ messages }) => {
    const { chatId } = useParams()
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        remove(getMessageRefById(chatId, id));
    };
    const handleEdit = (id) => {
        dispatch(editMessage (chatId, id, "edited"));
    };
    return messages.map((message) => (
        <div key={message.id}>
            <Message text={message.text} author={message.author} />
            <button onClick={() => handleDelete(message.id)}>Delete</button>
            <button onClick={() => handleEdit (message.id)}>Edit</button>
        </div>
    ));
};
