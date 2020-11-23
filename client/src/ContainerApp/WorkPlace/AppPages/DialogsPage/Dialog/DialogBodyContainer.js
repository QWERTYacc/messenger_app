import { connect } from 'react-redux';
import DialogBody from './DialogBody';

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const DialogBodyContainer = connect(mapStateToProps, mapDispatchToProps)(DialogBody);

export default DialogBodyContainer;