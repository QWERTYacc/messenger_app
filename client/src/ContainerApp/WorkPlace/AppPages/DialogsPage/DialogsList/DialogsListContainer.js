import { connect } from 'react-redux';
import DialogsList from './DialogsList';


let mapStateToProps = (state) => {
    return {
        dialogsList: state.dialogsList,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const DialogsListContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsList);

export default DialogsListContainer;