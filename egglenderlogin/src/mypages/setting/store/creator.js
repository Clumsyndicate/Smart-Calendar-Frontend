import axios from '../../../utils/request'
// import { actionTypes } from '../../notification/store';
import * as actionTypes from './types'
export const settingAct = data => {
    return dispatch => {
        return axios.post('/api/setting', data);
    };
};

export const settingUpdate = data => {
    return dispatch => {
        return axios.post('/api/settingupdate', data);
    };
};