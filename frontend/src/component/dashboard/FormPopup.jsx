import React, { useState, useEffect } from 'react'
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { TextArea } from 'devextreme-react/text-area';
const FormPopup = ({ visible, setVisible, formPromptData, setFormPromptData, getApiData }) => {

    const hideInfo = () => {
        setVisible(false)
    }

    const cancelbuttonOptions = {
        text: 'Cancel',
        onClick: function () {
            setVisible(false)
            setFormPromptData("");
        }
    }

    const createButtonOptions = {
        text: 'Create',
        onClick: getApiData
    }

    const setTextAreaPrompt = (e) => {
        const value = e.event?.currentTarget?.value;
        setFormPromptData(value);
    }


    return (
        <Popup
            visible={visible}
            onHiding={hideInfo}
            dragEnabled={false}
            hideOnOutsideClick={false}
            showCloseButton={true}
            showTitle={true}
            title="Create a new form"
            width={400}
            height={270}
        >
            <TextArea
                placeholder='Enter form Prompt'
                value={formPromptData}
                height={100}
                maxHeight={100}
                onInput={setTextAreaPrompt}
            />
            <ToolbarItem
                options={cancelbuttonOptions}
                widget="dxButton"
                location="before"
                toolbar="bottom"
            />
            <ToolbarItem
                options={createButtonOptions}
                widget="dxButton"
                location="after"
                toolbar="bottom"
                cssClass='headerbutton'
            />

        </Popup>
    )
}

export default FormPopup
