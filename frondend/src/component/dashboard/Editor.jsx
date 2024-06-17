import React, { useState } from 'react';
import { Button } from 'devextreme-react/button';
import "./Editor.css"
import FormPopup from './FormPopup';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const Editor = () => {
    const [visible, setVisible] = useState(false);
    const [formPromptData, setFormPromptData] = useState('');

    const user = localStorage.getItem("user");
    const { email } = user ? JSON.parse(user) : {};
    const popupVisiblityHandler = () => {
        setVisible(true)
    }

    const navigate = useNavigate();

    const PROMPT = ", On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldType, field , please also assign key value pair for select option if there required In Json format."
    const getApiData = async () => {
        try {
            const question = "Description:" + formPromptData + PROMPT;
            const uniqueId = uuidv4();
            const response = await fetch("/api/ai/generateForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formPrompt: question,
                    email: email,
                    id: uniqueId
                }),
            });
            navigate("/EditForm/" + uniqueId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='pntdashboardform'>
            <div className='dashboardformheader'>
                <h2 className='dashboardeditortitle'>Dashboard</h2>
                <Button
                    text="+ Create Form"
                    className='headerbutton'
                    onClick={popupVisiblityHandler}
                />
            </div>
            <FormPopup
                visible={visible}
                setVisible={setVisible}
                formPromptData={formPromptData}
                setFormPromptData={setFormPromptData}
                getApiData={getApiData}
            />
        </div>
    )
}

export default Editor
