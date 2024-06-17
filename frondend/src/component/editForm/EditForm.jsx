import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeft from "../../assets/arrowLeft.svg"
import "./EditForm.css"
import FormUi from './FormUi';
const EditForm = () => {

    const [jsonForm, setJsonForm] = useState('');
    const navigate = useNavigate();

    const { formId } = useParams();
    const user = localStorage.getItem("user");
    const { email } = user ? JSON.parse(user) : {};


    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/ai/getRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: formId,
                    email: email
                }),
            });
            const result = await response.json();
            if (result) {
                const data = JSON.parse(result)
                console.log(data);
                setJsonForm(data);
            } else {
                console.log("No Record Found");
            }
        }
        fetchData();
    }, [formId]);

    const navigateFunction = (path) => {
        navigate(path);
    }

    return (
        <div className='pnteditform'>
            <div className='editformbackbtn' onClick={() => navigateFunction("/Dashboard")}>
                <img src={ArrowLeft} alt="arrow" />
                Back
            </div>
            <div className='editformheader'>
                <div className='editformcontroller'>
                    controller
                </div>
                <div className='editformeditor'>
                    <FormUi
                        jsonForm={jsonForm}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditForm
