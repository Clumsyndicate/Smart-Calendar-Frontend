import { combineReducers} from 'redux';
import { reducer as signupReducer} from '../mypages/signup/store'
export default combineReducers({
    signup: signupReducer
});