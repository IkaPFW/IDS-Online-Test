import { DATA_FETCH_BY_ID_PENDING, DATA_FETCH_BY_ID_SUCCESS, DATA_FETCH_BY_ID_FAILURE } from "../actions/actionType";

const initState = {
    data: {},
    errMsg: '',
    isLoading: true
}

export function DataByIdReducer(state = initState, action){
    switch(action.type){
        case DATA_FETCH_BY_ID_PENDING:
            return {
                ...initState
            }
        case DATA_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case DATA_FETCH_BY_ID_FAILURE:
            return {
                ...state,
                errMsg: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}