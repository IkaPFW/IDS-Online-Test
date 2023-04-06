import { DATA_OPERATION_PENDING, DATA_OPERATION_SUCCESS, DATA_OPERATION_FAILURE } from "../actions/actionType";

const initState = {
    data: '',
    errMsg: '',
    isLoading: true
}

export function DataOperationReducer(state = initState, action){
    switch(action.type){
        case DATA_OPERATION_PENDING:
            return {
                ...initState
            }
        case DATA_OPERATION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case DATA_OPERATION_FAILURE:
            return {
                ...state,
                errMsg: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}