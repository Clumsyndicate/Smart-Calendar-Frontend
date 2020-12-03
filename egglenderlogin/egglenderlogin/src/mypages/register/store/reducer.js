import * as actionTypes from './types'
import isEmpty from 'lodash/isEmpty'
const initial = {
    hasLogin: false,
    info: {}
}
export default (state = initial, action) => {
    switch (action.type) {
        case actionTypes.SYNC_STATEANDINFO:
            return {
                hasLogin: !isEmpty(action.payload),
                info: action.payload,
            };
        default:
            return state;
    }
};