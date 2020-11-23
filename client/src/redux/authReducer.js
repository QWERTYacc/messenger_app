const REGISTRATION = 'REGISTRATION';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

let initialeState = {
    email: "",
    password: ""
};

const authReducer = (state = initialeState, action) => {

    switch (action.type) {
        case REGISTRATION:
            return {
                ...state,
                email: action.email,
                password: action.password,
            };

        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.id,
            };

        case LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }

        default:
            return state;
    };
};

export const registrationActionCreator = (email, password) => ({
    type: REGISTRATION,
    email: email,
    password: password,
});
export const loginActionCreator = (token, id) => ({
    type: LOGIN,
    token: token,
    id: id,
});
export const logoutActionCreator = () => ({
    type: LOGOUT,
});

export default authReducer;