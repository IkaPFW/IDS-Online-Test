import { DATA_FETCH_PENDING, DATA_FETCH_SUCCESS, DATA_FETCH_FAILURE } from "../actions/actionType";

const initState = {
    data: [],
    errMsg: '',
    isLoading: true
}

export function DataReducer(state = initState, action){
    switch(action.type){
        case DATA_FETCH_PENDING:
            return {
                ...initState
            }
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case DATA_FETCH_FAILURE:
            return {
                ...state,
                errMsg: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}