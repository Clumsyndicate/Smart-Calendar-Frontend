import axios from '../../../utils/request'
import * as actionTypes from './types'
export const registerAct = data =>
{
    return dispatch => {
        return axios.post('/api/register', data );
    };
    
    
};
export const syncInfoAct = data => {
    return {   
        type: actionTypes.SYNC_STATEANDINFO,
        payload: data,
    };
};