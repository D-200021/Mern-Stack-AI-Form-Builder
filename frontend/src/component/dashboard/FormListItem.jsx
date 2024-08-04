import React, { useState } from 'react'
import "./FormListItem.css"
import { Button } from "devextreme-react/button"
import shareIcon from '../../assets/share.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useNavigate } from 'react-router-dom';
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { RWebShare } from "react-web-share";

const FormListItem = ({ form, getFormList }) => {
    const [deletePopup, setDeletePopup] = useState(false);
    const { formTitle, formSubHeading, formSubheading, formHeading } = JSON.parse(form?.jsonform);
    const userDetail = localStorage.getItem("user");
    const { email } = userDetail ? JSON.parse(userDetail) : {};
    const navigate = useNavigate();

    const deleleFieldBtn = () => ({
        icon: 'trash',
        stylingMode: 'contained',
        text: 'Continue',
        onClick: function () {
            deleteHandler();
            setDeletePopup(false);
        },
    });

    const cancelDeletePopup = () => ({
        stylingMode: 'contained',
        text: 'Cancel',
        onClick: function () {
            setDeletePopup(false);
        },
    });

    const editHandler = () => {
        navigate("/EditForm/" + form.id);
    }

    const deleteHandler = async () => {
        try {
            const response = await fetch("/api/ai/deleteForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: form.id,
                    email: email,
                })
            });

            if (response.ok) {
                getFormList();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='formlistitem'>
            <div className='formListItemTitleContainer'>
                <h5 className='formListItemTitle'>{formTitle}</h5>
                <Button
                    icon={trashIcon}
                    onClick={() => setDeletePopup(true)}
                />
            </div>
            <h6 className='formListItemSubHeading'>{formSubHeading || formSubheading}</h6>
            <hr className='lineSpacing'></hr>
            <div className='formListItemButtons'>
                <RWebShare
                    data={{
                        text: form?.formHeading + "Build your form in seconds with AI Form Build",
                        url: "http://localhost:3000/AiForm/" + form.id,
                        title: form.formTitle,
                    }}
                // onClick={() => console.log("shared successfully!")}
                >
                    <Button
                        text='share'
                        icon={shareIcon}
                    />
                </RWebShare>
                <Button
                    text='edit'
                    icon={editIcon}
                    onClick={editHandler}
                />
            </div>
            <Popup
                visible={deletePopup}
                onHiding={() => setDeletePopup(false)}
                hideOnOutsideClick={false}
                dragEnabled={false}
                title='Are you sure ?'
                width={300}
                height={210}
                shading={false}
            >
                <div>
                    <p>This action cannot be undone. Are you sure you want to delete this Form ?</p>
                </div>
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={cancelDeletePopup()}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={deleleFieldBtn()}
                />
            </Popup>
        </div>
    )
}

export default FormListItem
