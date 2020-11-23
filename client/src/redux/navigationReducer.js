const GET_NEW_MESSAGES = 'GET_NEW_MESSAGES';

let initialeState = {
    newMessages: {}
};

const navigationReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_NEW_MESSAGES:
            return {
                ...state,
                newMessages: {
                    ...state.newMessages,
                    [action.data.dialogId]: action.data,
                },
            };

        default:
            return state;
    };
};

export const newMessagesActionCreator = (data) => ({
    type: GET_NEW_MESSAGES,
    data
});

export default navigationReducer;