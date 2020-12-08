import * as actionTypes from './types'
export default (state=[{id: 'xxx'}], action) =>
{
    switch(action.type)
    {
        case actionTypes.ADD_Note:
            return [
                ...state,
                action.payload,
            ];
        case actionTypes.Delete_Note:
            const i = state.findIndex(item => item.id === action.id);
            return [
                ...state.slice(0,i),
                ...state.slice(i+1),
            ];
        default:
            return state;

    }

}