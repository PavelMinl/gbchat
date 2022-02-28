import {List} from "@mui/material";
import { Outlet} from "react-router-dom";
import {ChatItem} from "./ChatItem";
import {FormMui} from "../FormMui";
import {useDispatch, useSelector} from "react-redux";
import {selectChats} from "../../store/chats/selectors";
import {addChat} from "../../store/chats/actions";





export const ChatList = () => {
    const chats = useSelector(selectChats) ;
    const dispatch = useDispatch()

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        dispatch(addChat(newId, newChatName));
    };

return (
    <>
        <List className="chatName">
            {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
            ))}
        </List>
        <FormMui onSubmit={handleAddChat} />
        <Outlet />
    </>
);
}