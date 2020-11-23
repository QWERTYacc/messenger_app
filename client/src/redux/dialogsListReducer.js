const UPLOAD_DIALOGS = 'UPLOAD_DIALOGS';
const CHECK_NEW_MESSAGES = 'CHECK_NEW_MESSAGES';
const RELOAD_DIALOGS = 'RELOAD_DIALOGS';

let initialeState = {
};

const dialogsReducer = (state = initialeState, action) => {

    switch (action.type) {
        case UPLOAD_DIALOGS:
            return {
                ...state,
                dialogs: action.data,
                isLoad: action.isLoad
            };

        case CHECK_NEW_MESSAGES:

            if (state.dialogs) {
                state.dialogs.forEach(dialog => {
                    if (action.dialogId === dialog.dialogId) {
                        dialog.newMsgs = action.messages.length;
                        dialog.lastMsg = action.lastMsg;
                    };
                });
            };

            if (action.messages.length > 0) {
                return {
                    ...state,
                    upDialog: action.dialogId
                };
            } else {
                return {
                    ...state,
                    upDialog: ''
                };
            };

        case RELOAD_DIALOGS:
            return {
                ...state,
                isLoad: false
            };

        default:
            return state;
    };
};

export const uploadDialogsActionCreator = (isLoad, data) => ({
    type: UPLOAD_DIALOGS,
    isLoad,
    data
});

export const checkNewMessagesOnDialogListActionCreator = (dialogId, messages, lastMsg) => ({
    type: CHECK_NEW_MESSAGES,
    dialogId,
    messages,
    lastMsg,
});

export const reloadDialogsActionCreator = () => ({
    type: RELOAD_DIALOGS,
});

export default dialogsReducer;