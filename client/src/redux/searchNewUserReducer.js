const UPDATE_EMAIL = 'UPDATE_EMAIL';
const GET_NEW_USER = 'GET_NEW_USER';
const REDIRECT_NEW_USER = 'REDIRECT_NEW_USER';

let initialeState = {
    newContact: {
        email: '',
    },
};

const searchNewUserReducer = (state = initialeState, action) => {

    switch (action.type) {
        case UPDATE_EMAIL:
            return {
                newContact: {
                    email: action.update
                },
                changed: action.changed,
                isLoad: action.isLoad
            };

        case GET_NEW_USER:
            if (action.data === null) action.data = { email: '' }
            return {
                newContact: action.data,
                changed: action.changed,
                isLoad: action.isLoad,
            };

        case REDIRECT_NEW_USER:

            if (action.redirect === false) {
                return {
                    newContact: {
                        email: '',
                    },
                };
            };
            return {
                newContact: {
                    email: '',
                },
                redirect: action.redirect,
            };

        default:
            return state;
    };
};

export const updateEmailActionCreator = (update, changed, isLoad) => ({
    type: UPDATE_EMAIL,
    update,
    changed,
    isLoad
});
export const getNewUserActionCreator = (data, changed, isLoad) => ({
    type: GET_NEW_USER,
    data,
    changed,
    isLoad
});
export const redirectNewUserActionCreator = (redirect) => ({
    type: REDIRECT_NEW_USER,
    redirect,
});

export default searchNewUserReducer;