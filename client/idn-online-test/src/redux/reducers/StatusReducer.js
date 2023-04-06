import { STATUS_FETCH_FAILURE, STATUS_FETCH_PENDING, STATUS_FETCH_SUCCESS } from "../actions/actionType";

const initState = {
    data: [],
    errMsg: '',
    isLoading: true
}

export function StatusReducer(state = initState, action){
    switch(action.type){
        case STATUS_FETCH_PENDING:
            return {
                ...initState
            }
        case STATUS_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case STATUS_FETCH_FAILURE:
            return {
                ...state,
                errMsg: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}