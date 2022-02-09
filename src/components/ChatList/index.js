import {List, ListItem} from "@mui/material";
import {NavLink, Outlet} from "react-router-dom";


const chatic = [
    {name: "User1", id: "1"},
    {name: "User2", id: "2"},
];

export const ChatList = () => (
    <>
    <List className="chatName">
        {chatic.map((chat) =>(
            <ListItem key={chat.id} >
                <NavLink to={`/chats/${chat.id}`} style={({isActive})=>({color: isActive ? "red" : "grey"})}> {chat.name}</NavLink>
            </ListItem>
        ))}
    </List>
    <Outlet />
    </>
)