const UPLOAD_CONTACTS = 'UPLOAD_CONTACTS';
const RELOAD_CONTACTS = 'RELOAD_CONTACTS';
const CONTACT_CARD = 'CONTACT_CARD';

let initialeState = {
    isLoad: false
};

const contactsReducer = (state = initialeState, action) => {

    switch (action.type) {
        case UPLOAD_CONTACTS:
            return {
                contacts: action.data,
                isLoad: true,
            };

        case RELOAD_CONTACTS:
            return {
                ...state,
                isLoad: false,
            };
        case CONTACT_CARD:
            if (action.contactCard.userBirthday !== null && action.contactCard.userBirthday !== undefined) {
                let dataArr = action.contactCard.userBirthday.split('');
                action.contactCard.userBirthday = dataArr.slice(0, 10).join('');
            };
            return {
                ...state,
                contactCard: action.contactCard,
            };

        default:
            return state;
    };
};

export const getContactsActionCreator = (data) => ({
    type: UPLOAD_CONTACTS,
    data,
});

export const reloadContactsActionCreator = () => ({
    type: RELOAD_CONTACTS,
});

export const contactCardActionCreator = (contactCard) => ({
    type: CONTACT_CARD,
    contactCard,
});

export default contactsReducer;