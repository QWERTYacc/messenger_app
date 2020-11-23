const GET_USER_DATA = 'GET_USER_DATA';
const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const RELOAD_USER_DATA = 'RELOAD_USER_DATA';


let initialeState = {
    id: null,
    changed: false,
    changePage: false,
};

const profileReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            let userBirthday = null;
            if (action.userData.userBirthday !== null && action.userData.userBirthday !== undefined) {
                let dataArr = action.userData.userBirthday.split('');
                userBirthday = dataArr.slice(0, 10).join('');
            };
            return {
                id: action.userData.id,
                userPhoto: action.userData.userPhoto,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                email: action.userData.email,
                userSex: action.userData.userSex,
                userBirthday: userBirthday,
                changed: false,
                changePage: false,
            };

        case CHANGE_USER_DATA:
            return {
                ...state,
                changePage: action.change
            };

        case UPDATE_USER_DATA:
            return {
                ...state,
                [action.itemName]: action.itemValue,
                changed: true
            };

        case RELOAD_USER_DATA:
            return {
                ...state,
                id: action.id,
            };

        default:
            return state;
    };
};

export const getUserDataActionCreator = (userData) => ({
    type: GET_USER_DATA,
    userData
});
export const changeUserDataActionCreator = (change) => ({
    type: CHANGE_USER_DATA,
    change
});
export const updateDataActionCreator = (itemName, itemValue, disabled) => ({
    type: UPDATE_USER_DATA,
    itemName,
    itemValue,
    disabled
});
export const reloadActionCreator = (id) => ({
    type: RELOAD_USER_DATA,
    id
});

export default profileReducer;