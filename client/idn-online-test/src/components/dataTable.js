import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllData } from "../redux/actions/actionCreator"

export default function DataTable(){
    const dispatch = useDispatch()

    const {data: data} = useSelector((state) => {
        return state.data
    })

    useEffect(() => {
        dispatch(getAllData())
    }, [])

    const loopDataTableRow = () => {
        const temp = []
        // console.log(data)

        for(let i of data){
            temp.push(
                <tr>
                    <td>{i.id}</td>
                    <td>{i.productID}</td>
                    <td>{i.productName}</td>
                    <td>{i.amount}</td>
                    <td>{i.customerName}</td>
                    <td>{i.transactionDate}</td>
                    <td>{i.Status.name}</td>
                    <td>
                        <Link to={`/${i.id}`} className="btn btn-success mx-2">Detail</Link>
                        <Link to={`/edit/${i.id}`} className="btn btn-warning my-2">Edit</Link>
                    </td>
                </tr>
            )
        }

        return temp
    }

    return(
        <div id="data-table-page">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Data List</h4>
                        <Link to={'/add'} className="btn btn-primary my-2">Add</Link>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Amount</th>
                                        <th>Customer Name</th>
                                        <th>Transaction Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{loopDataTableRow()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}