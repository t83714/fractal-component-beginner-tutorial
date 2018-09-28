import * as actionTypes from "../actions/types";

const reducer = function(state, action) {
    switch (action.type) {
        case actionTypes.CLICK:
            return {
                ...state,
                isSwitchOn: state.isSwitchOn ? false : true
            };
        default:
            return state;
    }
};
export default reducer;
