import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { editData, getAllData, getAllStatus, getDataById } from "../redux/actions/actionCreator"

export default function EditData(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()
    const [data, setData] = useState({
        productID: 0,
        productName: "",
        amount: 0,
        customerName: "",
        transactionDate: "",
        statusId: 0,
        createBy: "",
        createOn: ""
    })
    const {data: dataById} = useSelector((state) => {
        return state.dataById
    })
    const {data: status} = useSelector((state) => {
        return state.status
    })

    useEffect(() => {
        dispatch(getDataById(id))
        dispatch(getAllStatus())
    }, [id])

    useEffect(() => {
        setData({
            productID: dataById?.productID,
            productName: dataById?.productName,
            amount: dataById?.amount,
            customerName: dataById?.customerName,
            transactionDate: dataById?.transactionDate,
            statusId: dataById?.statusId,
            createBy: dataById?.createBy,
            createOn: dataById?.createOn
        })
    }, [dataById])

    const loopStatusOptions = (val) => {
        const temp = []

        for(let i of status){
            if(val === i.id){
                temp.push(
                    <option selected value={i.id}>{i.name}</option>
                )
            } else {
                temp.push(
                    <option value={i.id}>{i.name}</option>
                )
            }
        }

        return temp
    }

    const editDataHandler = async (dataToPost) => {
        try {
            await dispatch(editData(id, dataToPost))
            await dispatch(getAllData())

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = (e) => {
        const newObj = {
            ...dataById
        }

        newObj[e.target.name] = e.target.value

        setData(newObj)
    }

    const editDataEvent = async (e) => {
        e.preventDefault()
        // console.log(data)
        editDataHandler(data)
    }
    return(
        <div id="data-table-page">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Link to={'/'} className="btn btn-primary my-2">Back</Link>
                        <h2 className="card-title mb-2">Edit New Data</h2>
                        <form className="forms-sample" onSubmit={editDataEvent}>
                            <div className="form-group mb-3">
                                <label for="productID" className="mb-2">Product ID</label>
                                <input onChange={updateData} type="number" name="productID" id="productID" className="form-control" value={data.productID}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="productName" className="mb-2">Product Name</label>
                                <input onChange={updateData} type="text" name="productName" id="productName" className="form-control" value={data.productName}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="amount" className="mb-2">Amount</label>
                                <input onChange={updateData} type="number" name="amount" id="amount" className="form-control" value={data.amount}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="customerName" className="mb-2">Customer Name</label>
                                <input onChange={updateData} type="text" name="customerName" id="customerName" className="form-control" value={data.customerName}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="transactionDate" className="mb-2">Transaction Date</label>
                                <input onChange={updateData} type="date" name="transactionDate" id="transactionDate" className="form-control" value={data.transactionDate ? new Date(data.transactionDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10)}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="statusId" className="mb-2">Status</label>
                                <select onChange={updateData} className="form-select" name="statusId" id="statusId">
                                    {loopStatusOptions(data.statusId)}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label for="createBy" className="mb-2">Created By</label>
                                <input onChange={updateData} type="text" name="createBy" id="createBy" className="form-control" value={data.createBy}/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="createOn" className="mb-2">Creation Date</label>
                                <input onChange={updateData} type="date" name="createOn" id="createOn" className="form-control" value={data.createOn ? new Date(data.createOn).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10)}/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}