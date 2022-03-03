import { useCallback } from "react";
import { remove } from "@firebase/database";
import {getChatsRefById} from "../../services/firebase";

export const DeleteButton = ({ id }) => {

  const handleDeleteChat = () => {
    remove (getChatsRefById (id));
  };

  return <div onClick={handleDeleteChat}>X</div>;
};
