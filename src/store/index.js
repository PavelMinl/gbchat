import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { profileReducer } from "./profile/reducer";
import { chatsReducer } from "./chats/reducer";
import {persistReducer, persistStore} from "redux-persist";
import {messagesReducer} from "./messages/reducer";
import {articlesReducer} from "./articles/reducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer ,
    articles: articlesReducer ,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: "gbMessenger",
    storage ,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware (thunk))
);
export const persistor = persistStore(store);
