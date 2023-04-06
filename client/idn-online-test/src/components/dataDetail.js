import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDataById } from "../redux/actions/actionCreator"

export default function DataDetail(){
    const dispatch = useDispatch()

    const {id} = useParams()
    const {data: dataById} = useSelector((state) => {
        return state.dataById
    })

    useEffect(() => {
        dispatch(getDataById(id))
    }, [])

    // console.log(dataById.Status)

    return(
        <div id="data-table-page">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Link to={'/'} className="btn btn-primary my-2">Back</Link>
                        <h2 className="card-title mb-2">Data ID {dataById.id}</h2>
                        <h4 className="mb-3">{dataById.productName} - Product ID {dataById.productID}</h4>
                        <p>Product amount: {dataById.amount}</p>
                        <p>Customer Name: {dataById.customerName}</p>
                        <p>Status: {dataById.statusId} - {dataById.Status ? dataById.Status.name : 'Loading status...'}</p>
                        <p>Transaction Date: {dataById.transactionDate}</p>
                        <p>Created By: {dataById.createBy}</p>
                        <p>Creation Date: {dataById.createOn}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}