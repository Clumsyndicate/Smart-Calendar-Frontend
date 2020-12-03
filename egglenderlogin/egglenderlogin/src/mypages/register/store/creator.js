import axios from '../../../utils/request'
export const registerAct = data =>
{
    return dispatch => {
        return axios.post('/api/register', data );
    };
    
    
};