import React, { useEffect } from 'react'
import logo from '../../assets/logo.svg';
import "./Header.css";
import { Button } from "devextreme-react/button"
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    const openPage = (route) => {
        try {
            navigate(`/${route}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const user = localStorage.getItem("user");

    const { email } = user ? JSON.parse(user) : {};

    useEffect(() => {
        console.log(pathName);
    }, [pathName]);

    return !pathName.includes("AiForm") && (
        <div className='header'>
            <div className='headerdisplay'>
                <img src={logo} alt="AI FORM BUILDER" width={180} height={50} />
                {
                    email ?
                        <div>
                            <Button
                                text='Dashboard'
                                width={110}
                                height={40}
                                className='headerbutton'
                                onClick={() => openPage("Dashboard")}
                            />
                        </div>
                        :
                        <Button
                            text="Get Started"
                            width={110}
                            height={40}
                            className='headerbutton'
                            onClick={() => openPage("Login")}
                        />
                }
            </div>
        </div>
    )
}

export default Header
