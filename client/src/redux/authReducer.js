const CHANGE_INPUTS = 'CHANGE_INPUTS';
const REGISTRATION = 'REGISTRATION';
const LOGIN = 'LOGIN';

let initialeState = {
    email: "",
    password: ""
};

const authReducer = (state = initialeState, action) => {

    switch (action.type) {
        case CHANGE_INPUTS:
            return {
                ...state,
                email: action.email,
                password: action.password,
            };

        case REGISTRATION:
            return {
                email: '',
                password: '',
                newUser: action.newUser,
                isLoad: action.isLoad,
            };

        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.id,
            };

        default:
            return state;
    };
};

export const changeInputValueActionCreator = (email, password) => ({
    type: CHANGE_INPUTS,
    email: email,
    password: password,
});
export const registrationActionCreator = (isLoad, newUser) => ({
    type: REGISTRATION,
    isLoad,
    newUser,
});
export const loginActionCreator = (token, id) => ({
    type: LOGIN,
    token: token,
    id: id,
});

export default authReducer;