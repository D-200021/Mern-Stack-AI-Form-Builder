import React, { useEffect } from 'react'
import "./SideNav.css"
import form from "../../assets/form.svg";
import responses from "../../assets/reponses.svg";
import anatytics from "../../assets/anatytics.svg";
import upgrade from "../../assets/upgrade.svg";
import { useLocation } from 'react-router-dom';
import { Button } from 'devextreme-react/button';
import { ProgressBar } from "devextreme-react/progress-bar"
const SideNav = () => {

    const path = useLocation();

    useEffect(() => {
        console.log(path.pathname);
    }, [path]);


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
            path: "/dashboard/responses"
        },
        {
            id: 3,
            name: 'Analytics',
            icon: anatytics,
            path: "/dashboard/analytics"
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: upgrade,
            path: "/dashboard/upgrade"
        }
    ]
    return (
        <div className='pntsidenav'>
            <div className='pntsidenavheader'>
                {
                    menuList.map((item, index) => {
                        return (
                            <div className={item.path === path.pathname ? `sidenavitem bg-primary` : "sidenavitem"} key={item.id}>
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
                        value={40}
                        showStatus={false}
                    />
                    <h5 className='progressbartext'><strong>2</strong> Out Of<strong> 3 </strong> Files Created</h5>
                    <h5 className='progressbartextupgrade'>Upgrade Your Plan</h5>
                </div>
            </div>
        </div>
    )
}

export default SideNav
