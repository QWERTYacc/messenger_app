const ID_DIALOG = 'ID_DIALOG';
const UPLOAD_DIALOG = 'UPLOAD_DIALOG';

export const dialogs = {
    currentDialog: null,
};

let initialeState = {
    dialogId: '',
    dialog: {
        messages: [],
    }
};

const dialogBodyReducer = (state = initialeState, action) => {

    switch (action.type) {

        case ID_DIALOG:

            dialogs.currentDialog = action.dialogId;

            if (!dialogs[action.dialogId]) {
                return {
                    ...state,
                    dialogId: action.dialogId,
                    isLoad: false,
                };
            };
            return {
                ...state,
                dialogId: action.dialogId,
                dialog: dialogs[action.dialogId],
                isLoad: true,
            };


        case UPLOAD_DIALOG:

            dialogs[action.dialog.dialogId] = action.dialog;

            return {
                ...state,
                dialog: dialogs[dialogs.currentDialog],
                isLoad: true,
            };

        default:
            return state;
    };
};

export const dialogIdActionCreator = (dialogId) => ({
    type: ID_DIALOG,
    dialogId
});
export const uploadDialogActionCreator = (data) => ({
    type: UPLOAD_DIALOG,
    dialog: data,
});

export default dialogBodyReducer;