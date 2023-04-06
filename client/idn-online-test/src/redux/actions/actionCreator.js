import { DATA_FETCH_PENDING, DATA_FETCH_SUCCESS, DATA_FETCH_FAILURE, DATA_FETCH_BY_ID_PENDING, DATA_FETCH_BY_ID_SUCCESS, DATA_FETCH_BY_ID_FAILURE, DATA_OPERATION_PENDING, DATA_OPERATION_SUCCESS, DATA_OPERATION_FAILURE, STATUS_FETCH_PENDING, STATUS_FETCH_SUCCESS, STATUS_FETCH_FAILURE } from "./actionType";
import axios from 'axios'

const dispatchDataPending = () => {
    return {
        type: DATA_FETCH_PENDING
    }
}

const dispatchDataSuccess = (data) => {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: data
    }
}

const dispatchDataFailure = (error) => {
    return {
        type: DATA_FETCH_FAILURE,
        payload: error
    }
}

export const getAllData = () => {
    return async(dispatch, getState) => {
        dispatch(dispatchDataPending)

        try {
            let data = await axios.get('http://localhost:3000/')

            dispatch(dispatchDataSuccess(data.data.allData))
        } catch (error) {
            dispatch(dispatchDataFailure(error.message))
        }
    }
}

const dispatchDataByIdPending = () => {
    return {
        type: DATA_FETCH_BY_ID_PENDING
    }
}

const dispatchDataByIdSuccess = (data) => {
    return {
        type: DATA_FETCH_BY_ID_SUCCESS,
        payload: data
    }
}

const dispatchDataByIdFailure = (error) => {
    return {
        type: DATA_FETCH_BY_ID_FAILURE,
        payload: error
    }
}

export const getDataById = (dataId) => {
    return async(dispatch, getState) => {
        dispatch(dispatchDataByIdPending)
        
        try {
            let data = await axios.get(`http://localhost:3000/${dataId}`)
            // console.log(data.data.data.Status.name, '--------------')

            dispatch(dispatchDataByIdSuccess(data.data.data))
        } catch (error) {
            dispatch(dispatchDataByIdFailure(error.message))
        }
    }
}

const dispatchDataOperationPending = () => {
    return {
        type: DATA_OPERATION_PENDING
    }
}

const dispatchDataOperationSuccess = (data) => {
    return {
        type: DATA_OPERATION_SUCCESS,
        payload: data
    }
}

const dispatchDataOperationFailure = (error) => {
    return {
        type: DATA_OPERATION_FAILURE,
        payload: error
    }
}

export const addData = (input) => {
    console.log(input, '<<<<<<<<<')
    const {productID, productName, amount, customerName, statusId, transactionDate, createBy, createOn} = input

    return async(dispatch, getState) => {
        dispatch(dispatchDataOperationPending)

        try {
            let data = await axios.post('http://localhost:3000',{
                productID,
                productName, 
                amount,
                customerName,
                statusId,
                transactionDate,
                createBy,
                createOn
            })

            dispatch(dispatchDataOperationSuccess(data.message))
        } catch (error) {
            dispatch(dispatchDataOperationFailure(error.message))
        }
    }
}

export const editData = (dataId, input) => {
    const {productID, productName, amount, customerName, statusId, transactionDate, createBy, createOn} = input

    return async(dispatch, getState) => {
        dispatch(dispatchDataOperationPending)

        try {
            let data = await axios.put(`http://localhost:3000/${dataId}`,{
                productID,
                productName, 
                amount,
                customerName,
                statusId,
                transactionDate,
                createBy,
                createOn
            })

            dispatch(dispatchDataOperationSuccess(data.message))
        } catch (error) {
            dispatch(dispatchDataOperationFailure(error.message))
        }
    }
}

const dispatchStatusPending = () => {
    return {
        type: STATUS_FETCH_PENDING
    }
}

const dispatchStatusSuccess = (data) => {
    return {
        type: STATUS_FETCH_SUCCESS,
        payload: data
    }
}

const dispatchStatusFailure = (error) => {
    return {
        type: STATUS_FETCH_FAILURE,
        payload: error
    }
}

export const getAllStatus = () => {
    return async(dispatch, getState) => {
        dispatch(dispatchStatusPending)

        try {
            let data = await axios.get('http://localhost:3000/status')

            dispatch(dispatchStatusSuccess(data.data.allStatus))
        } catch (error) {
            dispatch(dispatchStatusFailure(error.message))
        }
    }
}