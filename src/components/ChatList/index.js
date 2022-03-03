import {List} from "@mui/material";
import { Outlet} from "react-router-dom";
import {ChatItem} from "./ChatItem";
import {FormMui} from "../FormMui";
import {useDispatch, useSelector} from "react-redux";
import {selectChats} from "../../store/chats/selectors";
import { initChatsTracking} from "../../store/chats/actions";
import {
    getChatsRefById,
    getMessagesRefByChatId,
} from "../../services/firebase";
import { set } from "@firebase/database";
import {useEffect} from "react";



export const ChatList = () => {
    const chats = useSelector(selectChats) ;
    const dispatch = useDispatch()

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        set(getChatsRefById(newId), { id: newId, name: newChatName });
        set(getMessagesRefByChatId(newId), { empty: true });
    };
    useEffect(() => {
        dispatch(initChatsTracking ());
    }, []);
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
