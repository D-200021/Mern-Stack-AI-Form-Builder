import React from 'react'
import SideNav from './SideNav'
import { Navigate } from 'react-router-dom';
import "./dashboard.css"
import Editor from './Editor';
const Dashboard = () => {
    const user = localStorage.getItem("user");
    const { email } = user ? JSON.parse(user) : {};

    return (
        <>
            {
                email
                    ?
                    (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className='pntdashboard'>
                                <SideNav />
                            </div>
                            <div className='dashboardform'>
                                <Editor />
                            </div>
                        </div>

                    )
                    :
                    <Navigate replace to="/Login" />
            }
        </>
    )
}

export default Dashboard
