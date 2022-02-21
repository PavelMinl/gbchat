import { ListItem } from "@mui/material";
import { NavLink} from "react-router-dom";

import { DeleteButton } from "./DeleteButton";

export const ChatItem = ({ chat, onDeleteChat }) => (
  <ListItem key={chat.id}>
      <NavLink to={`/chats/${chat.id}`} > {chat.name}</NavLink>
    <DeleteButton id={chat.id} onClick={onDeleteChat} />
  </ListItem>
);
