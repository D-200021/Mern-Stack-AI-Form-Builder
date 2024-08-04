import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeft from "../../assets/arrowLeft.svg";
import { Button } from "devextreme-react/button";
import { Toast } from 'devextreme-react/toast';
import "./EditForm.css"
import FormUi from './FormUi';
import Controller from './Controller';
import LiveImg from "../../assets/live.svg";
import ShareImg from "../../assets/share.svg";
import { RWebShare } from "react-web-share";

const EditForm = () => {

    const [jsonForm, setJsonForm] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('info');
    const navigate = useNavigate();

    const { formId } = useParams();
    const user = localStorage.getItem("user");
    const { email } = user ? JSON.parse(user) : {};


    const navigateHandler = (e) => {
        navigate("/dashboard");
    }


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

    const onFieldUpdate = (value, index) => {
        try {
            jsonForm.formFields[index].label = value.label;
            jsonForm.formFields[index].placeholder = value.placeholder;
            setJsonForm({ ...jsonForm });
        } catch (error) {
            console.log(error)
        }
    }

    const updateFormHandler = async () => {
        try {
            const response = await fetch("/api/ai/updateRecord", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formData: jsonForm,
                    id: formId,
                    email: email
                }),
            });
            const result = await response.json();
            setToastVisible(true);
            setToastType('success');
            setToastMessage(result.message);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteField = (index) => {
        try {
            jsonForm.formFields.splice(index, 1);
            setJsonForm({ ...jsonForm });
        } catch (error) {
            console.log(error)
        }
    }

    const livePreviewHandler = () => {
        try {
            <a>{navigate("/AiForm/" + formId)}</a>
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='pnteditform'>
            <Toast
                visible={toastVisible}
                message={toastMessage}
                type={toastType}
                onHiding={() => setToastVisible(false)}
                displayTime={3000}
            />
            <div className='editformbackbtn'>
                <div>
                    <img src={ArrowLeft} alt="arrow" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                        onClick={navigateHandler}
                    />
                    {/* Back */}
                </div>
                <div>
                    <Button
                        text='Live Preview'
                        style={{
                            marginRight: "10px",
                        }}
                        icon={LiveImg}
                        onClick={livePreviewHandler}
                    />
                    <RWebShare
                        data={{
                            text: jsonForm?.formHeading + "Build your form in seconds with AI Form Build",
                            url: "http://localhost:3000/AiForm/" + formId,
                            title: jsonForm.formTitle,
                        }}
                    // onClick={() => console.log("shared successfully!")}
                    >
                        <Button
                            text='Share'
                            style={{
                                marginRight: "10px",
                            }}
                            icon={ShareImg}
                        />
                    </RWebShare>
                    <Button
                        text='Update'
                        onClick={updateFormHandler}
                        style={{
                            float: "right",
                        }}
                    />
                </div>
            </div>
            <div className='editformheader'>
                <div className='editformcontroller'>
                    <Controller
                        jsonForm={jsonForm}
                        setJsonForm={setJsonForm}
                    />
                </div>
                <div className='editformeditor'>
                    <FormUi
                        jsonForm={jsonForm}
                        onFieldUpdate={onFieldUpdate}
                        deleteField={(index) => deleteField(index)}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditForm
