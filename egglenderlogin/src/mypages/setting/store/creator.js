import axios from '../../../utils/request'
// import { actionTypes } from '../../notification/store';
import * as actionTypes from './types'
export const settingAct = (data,token) => {
    let config = {
        headers: {
        "x-access-token": token
        }
      }
    return dispatch => {
        return axios.post('/api/setting', data,config);
    };
};

export const settingUpdate = (data, token) => {
    let config = {
        headers: {
        "x-access-token": token
        }
      }
    return dispatch => {
        console.log('reach update');
        return axios.post('/api/settingupdate', data,config);
    };
};

export const uploadAvatar = (data, token) => {
    let config = {
        headers: {
        "x-access-token": token
        }
      }
    return dispatch => {
        return axios.post('/api/uploadAvatar', data,config);
    };
};