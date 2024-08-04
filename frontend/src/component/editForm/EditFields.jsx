import React, { useState } from 'react'
import EditIcon from "../../assets/edit.svg"
import DeleteIcon from "../../assets/trash.svg"
import { Popup, Position, ToolbarItem } from "devextreme-react/popup"
import "./EditFields.css"
import { TextBox } from 'devextreme-react/text-box'
const EditFields = ({ defaultValue, onUpdate, deleteField }) => {
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState(defaultValue?.label);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
    const [Positionof, setPositionof] = useState('editicon');
    const [deletePopup, setDeletePopup] = useState(false);
    const showEditPopup = (e) => {
        setVisible(true);
        setPositionof(e.target.id);
    }

    const getUpdateButtonOptions = () => ({
        // icon: 'email',
        stylingMode: 'contained',
        text: 'Apply',
        onClick: onUpdateField,
    });

    const onUpdateField = () => {
        onUpdate({
            label: label,
            placeholder: placeholder
        })
        setVisible(false);
    }

    const onLabelChange = (e) => {
        setLabel(e.component?._changedValue);
    }

    const onPlaceholderChange = (e) => {
        setPlaceholder(e.component?._changedValue);
    }

    const deleteFieldHandler = () => {
        setDeletePopup(true);
    }

    const deleleFieldBtn = () => ({
        icon: 'trash',
        stylingMode: 'contained',
        text: 'Continue',
        onClick: function () {
            deleteField();
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

    return (
        <div className='fieldiconalignment' >
            <img id={`editIcon-${defaultValue?.fieldName}`} src={EditIcon} alt="edit icon" className="edit-field" onClick={showEditPopup} />
            <img src={DeleteIcon} alt="edit icon" className="edit-field" onClick={deleteFieldHandler} />
            <Popup
                visible={visible}
                onHiding={() => setVisible(false)}
                hideOnOutsideClick={false}
                showCloseButton={true}
                title={defaultValue.label}
                showTitle={true}
                width={300}
                height={290}
                content="Edit Field"
                dragEnabled={false}
                shading={false}
            >
                <Position
                    my='left center'
                    at='left bottom'
                    of={"#" + Positionof}
                    collision="fit"
                />
                <TextBox
                    placeholder='Edit Field'
                    width={"95%"}
                    label='Label Name'
                    labelMode="outside"
                    // showClearButton={true}
                    defaultValue={defaultValue?.label}
                    onChange={onLabelChange}
                />
                <TextBox
                    placeholder='Edit Placeholder'
                    width={"95%"}
                    label='Placeholder Name'
                    labelMode="outside"
                    // showClearButton={true}
                    defaultValue={defaultValue?.placeholder}
                    onChange={onPlaceholderChange}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={getUpdateButtonOptions()}
                />
            </Popup>

            <Popup
                visible={deletePopup}
                onHiding={() => setDeletePopup(false)}
                hideOnOutsideClick={false}
                dragEnabled={false}
                title='Are you sure?'
                width={300}
                height={210}
                shading={false}
            >
                <div>
                    <p>This action cannot be undone. Are you sure you want to delete this field? this </p>
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

export default EditFields
