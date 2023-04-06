import { applyMiddleware, combineReducers, createStore } from "redux";
import { DataReducer } from "../reducers/DataReducer";
import { DataByIdReducer } from "../reducers/DataByIdReducer";
import { DataOperationReducer } from "../reducers/DataOperationReducer";
import { StatusReducer } from "../reducers/StatusReducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    data: DataReducer,
    dataById: DataByIdReducer,
    dataOperation: DataOperationReducer,
    status: StatusReducer
})

const logger = (store) => (next) => (action) => {
    return next(action)
}

export const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
)