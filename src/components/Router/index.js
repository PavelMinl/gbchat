import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import Chat from "../Chat";
import {ChatList} from "../ChatList";
import {Profile} from "../Profile";


const Home = () => <h2>HOME</h2>;


export const Router = () => {
    return(
<BrowserRouter>
    <div>
    <NavLink to="/" style={({isActive})=>({color: isActive ? "red" : "grey"})}>home</NavLink>
    </div>
    <div> <NavLink to="/chats" style={({isActive})=>({color: isActive ? "red" : "grey"})}>Chats</NavLink>
    </div>
    <div> <NavLink to="/profile" style={({isActive})=>({color: isActive ? "red" : "grey"})}>Profile</NavLink>
    </div>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chats" element={<ChatList />}  >
            <Route path=":chatid" element={<Chat />}/>
        </Route>
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<h2>Такой странице нету <br/> 404 </h2>} />
    </Routes>
</BrowserRouter>
    )
}