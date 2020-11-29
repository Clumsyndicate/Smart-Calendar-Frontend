import axios from '../../../utils/request'
// import { actionTypes } from '../../notification/store';
import * as actionTypes from './types'
export const loginAct = data => {
    return dispatch => {
        return axios.post('/api/login', data);
    };
};

export const syncInfoAct = data => {
    return {   
        type: actionTypes.SYNC_STATEANDINFO,
        payload: data,
    };
};
