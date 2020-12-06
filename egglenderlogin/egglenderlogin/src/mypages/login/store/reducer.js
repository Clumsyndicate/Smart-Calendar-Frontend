import * as actionTypes from './types'
import isEmpty from 'lodash/isEmpty'
const initial = {
    hasLogin: false,
    info: {},
    userName: '',
}
export default (state = initial, action) => {
    switch (action.type) {
        case actionTypes.SYNC_STATEANDINFO:
            return {
                hasLogin: !isEmpty(action.payload),
                info: action.payload,
                userName:action.userName
            };
        default:
            return state;
    }
};