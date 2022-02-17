import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile/reducer";
import {chatsReducer} from "./store/chats/reducer";

export const store = createStore(
    combineReducers({
        profile: profileReducer,
        chats: chatsReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
