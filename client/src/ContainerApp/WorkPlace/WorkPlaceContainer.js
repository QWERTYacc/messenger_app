import { connect } from 'react-redux';
import WorkPlace from './WorkPlace';


let mapStateToProps = (state) => {
    return {
        // dialogId: state.dialogPage.dialogId,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const WorkPlaceContainer = connect(mapStateToProps, mapDispatchToProps)(WorkPlace);

export default WorkPlaceContainer;