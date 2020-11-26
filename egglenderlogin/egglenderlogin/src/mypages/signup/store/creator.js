import axios from '../../../utils/request'
export const signupAct = data =>
{
    return dispatch => {
        return axios.post('/api/signup', data );
    };
    
    
};