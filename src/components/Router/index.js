import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import {Chat} from "../Chat";
import {ChatList} from "../ChatList";
import ConnectedProfile, {Profile} from "../Profile";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThemeContext} from "../../utils/ThemeContext";
import {addChat, deleteChat} from "../../store/chats/actions";


const Home = () => <h2>HOME</h2>;

const inititalChats = [
    {name: "User1", id: "1"},
    {name: "User2", id: "2"},
];



const initialMessages = inititalChats.reduce((acc, el) =>{
    acc[el.id] = [];
        return acc;
}, {});

export const Router = () => {
    const [messageColor, setMessageColor] = useState("red");
const [messages,setMessages] = useState(initialMessages)


    const chatList = useSelector((state) => {
        console.log(state);
        return state.chats
    });
    const dispatch = useDispatch();

    const handleAddMessage = (chatId, newMsg) => {
        setMessages((prevMessageList) => ({
            ...prevMessageList,
            [chatId]: [...prevMessageList[chatId], newMsg],
        }));
    }
    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;

        dispatch(addChat(newId, newChatName));
        setMessages((prevMessages) => ({
            ...prevMessages,
            [newId]: [],
        }));
    };
    const handleDeleteChat = (idToDelete) => {
        dispatch(deleteChat(idToDelete));
        setMessages((prevMessages) => {
            const newMsg = { ...prevMessages };

            delete newMsg[idToDelete];
            return newMsg;
        });
    };
    const contextValue = {
        messageColor,
        setMessageColor,
    };
    return(
        <ThemeContext.Provider value={contextValue}>
            <BrowserRouter>
                <div>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                    >
                        home
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                        to="/chats"
                    >
                        chats
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                        to="/profile"
                    >
                        profile
                    </NavLink>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ConnectedProfile />} />
                    <Route
                        path="chats"
                        element={
                            <ChatList
                                onDeleteChat={handleDeleteChat}
                                onAddChat={handleAddChat}
                                chats={chatList}
                            />
                        }
                    >
                        <Route
                            path=":chatId"
                            element={
                                <Chat messages={messages} addMessage={handleAddMessage} />
                            }
                        />
                    </Route>
                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}