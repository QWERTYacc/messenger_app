import { createStore, combineReducers } from "redux";
import authReducer from './authReducer.js';
import navigationReducer from './navigationReducer.js';
import dialogsListReducer from './dialogsListReducer.js';
import searchNewUserReducer from './searchNewUserReducer.js';
import dialogBodyReducer from './dialogBodyReducer.js';
import textAreaReducer from './textAreaReducer.js';
import contactsReducer from './contactsReducer.js';
import profileReducer from './profileReducer.js';

const LOG_OUT = "LOG_OUT";

let reducers = combineReducers({
    authPage: authReducer,
    navBar: navigationReducer,
    profilePage: profileReducer,
    dialogsList: dialogsListReducer,
    searchNewUser: searchNewUserReducer,
    dialogPage: dialogBodyReducer,
    textArea: textAreaReducer,
    contactsPage: contactsReducer,
});

let appStore = (state, action) => {
    if (action.type === LOG_OUT) {
        state = undefined;
        localStorage.clear();
    };
    return reducers(state, action);
};

export const logoutActionCreator = () => ({
    type: LOG_OUT,
});

let store = createStore(appStore);

window.store = store;

export default store;