import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import DataTable from "../components/dataTable";
import DataDetail from "../components/dataDetail";
import AddData from "../components/addData";
import EditData from "../components/editData";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <DataTable />
            },
            {
                path: '/:id',
                element: <DataDetail />
            },
            {
                path: '/add',
                element: <AddData />
            },
            {
                path: '/edit/:id',
                element: <EditData />
            }
        ]
    }
])

export default router