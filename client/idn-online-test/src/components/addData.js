import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { addData, getAllData, getAllStatus} from "../redux/actions/actionCreator"

export default function AddData(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const {data: status} = useSelector((state) => {
        return state.status
    })

    useEffect(() => {
        dispatch(getAllStatus())
    }, [])

    const loopStatusOptions = () => {
        const temp = []

        for(let i of status){
            temp.push(
                <option value={i.id}>{i.name}</option>
            )
        }

        return temp
    }

    const addDataHandler = async (dataToPost) => {
        try {
            await dispatch(addData(dataToPost))
            await dispatch(getAllData())

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const addDataEvent = async (e) => {
        e.preventDefault()
        // console.log(data)
        addDataHandler(data)
    }

    return(
        <div id="data-table-page">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Link to={'/'} className="btn btn-primary my-2">Back</Link>
                        <h2 className="card-title mb-2">Add New Data</h2>
                        <form className="forms-sample" onSubmit={addDataEvent}>
                            <div className="form-group mb-3">
                                <label for="productID" className="mb-2">Product ID</label>
                                <input onChange={updateData} type="number" name="productID" id="productID" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="productName" className="mb-2">Product Name</label>
                                <input onChange={updateData} type="text" name="productName" id="productName" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="amount" className="mb-2">Amount</label>
                                <input onChange={updateData} type="number" name="amount" id="amount" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="customerName" className="mb-2">Customer Name</label>
                                <input onChange={updateData} type="text" name="customerName" id="customerName" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="transactionDate" className="mb-2">Transaction Date</label>
                                <input onChange={updateData} type="date" name="transactionDate" id="transactionDate" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="statusId" className="mb-2">Status</label>
                                <select onChange={updateData} className="form-select" name="statusId" id="statusId">
                                    {loopStatusOptions()}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label for="createBy" className="mb-2">Created By</label>
                                <input onChange={updateData} type="text" name="createBy" id="createBy" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label for="createOn" className="mb-2">Creation Date</label>
                                <input onChange={updateData} type="date" name="createOn" id="createOn" className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}