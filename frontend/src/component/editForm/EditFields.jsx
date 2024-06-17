import React from 'react'
import EditIcon from "../../assets/edit.svg"
import DeleteIcon from "../../assets/trash.svg"
import "./EditFields.css"
const EditFields = () => {
    return (
        <div className='fieldiconalignment' >
            <img src={EditIcon} alt="edit icon" className="edit-field" />
            <img src={DeleteIcon} alt="edit icon" className="edit-field" />
        </div>
    )
}

export default EditFields
