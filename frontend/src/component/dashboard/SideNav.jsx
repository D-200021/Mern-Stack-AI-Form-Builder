import React, { useEffect, useState } from 'react'
import "./SideNav.css"
import form from "../../assets/form.svg";
import responses from "../../assets/reponses.svg";
import upgrade from "../../assets/upgrade.svg";
import { useLocation } from 'react-router-dom';
import { Button } from 'devextreme-react/button';
import { ProgressBar } from "devextreme-react/progress-bar";

const SideNav = ({ currentMenuActive, setCurrentMenuActive }) => {

    const path = useLocation();
    const userDetail = localStorage.getItem("user");
    const { email } = userDetail ? JSON.parse(userDetail) : {};
    const [progress, setProgress] = useState(0);
    const [formCreated, setFormCreated] = useState(0);

    useEffect(() => {
        console.log(path.pathname);
    }, [path]);

    const menuButtonClickHandler = (e) => {
        try {
            const menuName = e.target?.innerText?.toLowerCase();;
            setCurrentMenuActive("/" + menuName);
        } catch (error) {
            console.log(error);
        }
    }


    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: form,
            path: "/dashboard"
        },
        {
            id: 2,
            name: 'Responses',
            icon: responses,
            path: "/responses"
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: upgrade,
            path: "/upgrade"
        }
    ]




    useEffect(() => {
        email && getFormList();
    }, [email])

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
            console.log(data);
            const formCreated = data.length;
            setFormCreated(formCreated);
            setProgress((formCreated / 3) * 100);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='pntsidenav'>
            <div className='pntsidenavheader'>
                {
                    menuList.map((item, index) => {
                        return (
                            <div onClick={menuButtonClickHandler} data={item} className={item.path === currentMenuActive ? `sidenavitem bg-primary` : "sidenavitem"} key={item.id}>
                                <img src={item.icon} width={30} height={30} />
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='pntsidenavfooter'>
                <Button
                    text='+ Create form'
                    className='headerbutton'
                    width={"12rem"}
                />
                <div className='pntsidenavfooterprogress'>
                    <ProgressBar
                        id="progress-bar-status"
                        // className={seconds === 0 ? 'complete' : ''}
                        width="90%"
                        height={16}
                        min={0}
                        max={100}
                        value={progress}
                        showStatus={false}
                    />
                    <h5 className='progressbartext'><strong>{formCreated}</strong> Out Of<strong> 3 </strong> Files Created</h5>
                    <h5 className='progressbartextupgrade'>Upgrade Your Plan</h5>
                </div>
            </div>
        </div>
    )
}

export default SideNav
