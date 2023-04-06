import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="main-panel">
                <div className="content-wrapper">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}