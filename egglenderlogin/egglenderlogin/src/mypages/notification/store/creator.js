import * as actionTypes from "./types"
export const addNoteAct = data => 
{
    return {
        type: actionTypes.ADD_Note ,
        payload: data,
    };
}

export const deletenoteAct = id => 
{
    return {
        type: actionTypes.Delete_Note ,
        id,
    };
}