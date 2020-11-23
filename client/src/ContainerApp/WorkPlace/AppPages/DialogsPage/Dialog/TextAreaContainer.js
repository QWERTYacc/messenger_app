import { connect } from 'react-redux';
import TextArea from './TextArea';


let mapStateToProps = (state) => {
    return {
        textArea: state.textArea,
        dialog: state.dialogPage.dialog
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const TextAreaContainer = connect(mapStateToProps, mapDispatchToProps)(TextArea);

export default TextAreaContainer;