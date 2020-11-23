import { connect } from 'react-redux';
import SearchNewUser from './SearchNewUser';


let mapStateToProps = (state) => {
    return {
        searchNewUser: state.searchNewUser,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const SearchNewUserContainer = connect(mapStateToProps, mapDispatchToProps)(SearchNewUser);

export default SearchNewUserContainer;