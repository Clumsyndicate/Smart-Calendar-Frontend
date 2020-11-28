import { combineReducers} from 'redux';
import { reducer as registerReducer} from '../mypages/register/store'
export default combineReducers({
    register: registerReducer
});