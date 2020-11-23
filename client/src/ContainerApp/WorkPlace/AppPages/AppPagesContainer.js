import { connect } from 'react-redux';
import AppPages from './AppPages';


let mapStateToProps = (state) => {
    return {
        dialogId: state.dialogPage.dialogId,
        isDialogsLoad: state.dialogsList.isLoad,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const AppPagesContainer = connect(mapStateToProps, mapDispatchToProps)(AppPages);

export default AppPagesContainer;