import { combineReducers} from 'redux';
import { reducer as registerReducer} from '../mypages/register/store'
import {reducer as noteReducer} from '../mypages/notification/store'
import {reducer as loginReducer} from '../mypages/login/store'
export default combineReducers({
    register: registerReducer,
    note: noteReducer,
    login: loginReducer,
});