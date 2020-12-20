import axios from '../../../utils/request'
// import { actionTypes } from '../../notification/store';
import * as actionTypes from './types'
export const getFriendListAct = (data,token) => {
    let config = {
        headers: {
        "x-access-token": token
        }
      }
    return dispatch => {
        return axios.post('/api/friendlist', data,config);
    };
};