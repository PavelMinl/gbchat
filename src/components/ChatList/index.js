import {List} from "@mui/material";
import { Outlet} from "react-router-dom";
import {ChatItem} from "./ChatItem";
import {FormMui} from "../FormMui";





export const ChatList = ({ chats, onAddChat, onDeleteChat }) => (
    <>
        <List className="chatName">
            {chats.map((chat) => (
                <ChatItem chat={chat} onDeleteChat={onDeleteChat} />
            ))}
        </List>
        <FormMui onSubmit={onAddChat} />
        <Outlet />
    </>
);