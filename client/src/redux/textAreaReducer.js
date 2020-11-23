const CHANGE_NEW_MESSAGE = 'CHANGE_NEW_MESSAGE';

let initialeState = {
    newMessage: '',

};

const textAreaReducer = (state = initialeState, action) => {

    switch (action.type) {

        case CHANGE_NEW_MESSAGE:
            return {
                newMessage: action.newMessage
            };

        default:
            return state;
    };
};

export const changeNewMessageActionCreator = (newMessage) => ({
    type: CHANGE_NEW_MESSAGE,
    newMessage
});

export default textAreaReducer;