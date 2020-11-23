import { connect } from 'react-redux';
import ContactsList from './ContactsList';


let mapStateToProps = (state) => {
    return {
        contactsPage: state.contactsPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const ContactsListContainer = connect(mapStateToProps, mapDispatchToProps)(ContactsList);

export default ContactsListContainer;