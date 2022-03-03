import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import {Chat} from "../Chat";
import {ChatList} from "../ChatList";
import ConnectedProfile, {Profile} from "../Profile";
import {useEffect, useState} from "react";
import {ThemeContext} from "../../utils/ThemeContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import {PublicRoute} from "../PublicRoute/PublicRoute";
import {Home} from "../Home/Home";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import {Articles} from "../Articles/Articles";


export const Router = () => {
    const [messageColor, setMessageColor] = useState("red");
const [authed,setAuthed] = useState(false)

    const unauthorize = () => {
        setAuthed(false);
    };
    const contextValue = {
        messageColor,
        setMessageColor,
    };

useEffect(() => {
    const unsubscribe = onAuthStateChanged (auth, (user) => {
        if (user) {
            setAuthed(true);
        } else {
            setAuthed(false);
        }
    });

    return unsubscribe;
}, []);

    return (
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
                        to="/articles"
                    >
                        articles
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
                    <Route path="/" element={<PublicRoute authed={authed} />}>
                        <Route path="" element={<Home />} />
                        <Route path="/signup" element={<Home isSignUp />} />
                    </Route>
                    <Route path="/profile" element={<PrivateRoute authed={authed} />}>
                        <Route
                            path=""
                            element={<ConnectedProfile onLogout={unauthorize} />}
                        />
                    </Route>
                    <Route path="/articles" element={<Articles />} />
                    <Route path="chats" element={<ChatList />}>
                        <Route path=":chatId" element={<Chat />} />
                    </Route>
                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
};
