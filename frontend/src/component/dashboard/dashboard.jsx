import React, { useState, useEffect } from 'react'
import SideNav from './SideNav'
import { Navigate } from 'react-router-dom';
import "./dashboard.css"
import Editor from './Editor';
import Responses from './Response';
import Uprade from './upgrade/Uprade';
const Dashboard = () => {
    const user = localStorage.getItem("user");
    const { email } = user ? JSON.parse(user) : {};
    const [currentMenuActive, setCurrentMenuActive] = useState("/dashboard");
    const [jsonFormData, setJsonFormData] = useState();

    useEffect(() => {
        if (currentMenuActive === "/responses") {
            email && getFormList();
        }
    }, [currentMenuActive])

    const getFormList = async () => {
        try {
            const response = await fetch("/api/ai/getFormList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                })
            });
            const data = await response.json();
            setJsonFormData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const renderScreen = () => {
        switch (currentMenuActive) {
            case "/dashboard":
                return <Editor />
            case "/responses":
                return <Responses jsonFormData={jsonFormData} />
            case "/upgrade":
                return < Uprade />
            default:
                return <Editor />
        }
    }

    return (
        <>
            {
                email
                    ?
                    (
                        <div className='mainDashboardLayout'>
                            <div className='pntdashboard'>
                                <SideNav
                                    currentMenuActive={currentMenuActive}
                                    setCurrentMenuActive={setCurrentMenuActive}
                                />
                            </div>
                            <div className='dashboardform'>
                                {
                                    renderScreen()
                                }
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
