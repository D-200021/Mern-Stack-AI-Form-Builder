import React, { useState, useCallback } from 'react';
import { Form, SimpleItem } from 'devextreme-react/form';
import { TextBox } from 'devextreme-react/text-box';
import { SelectBox } from 'devextreme-react/select-box';
import { TagBox } from 'devextreme-react/tag-box';
import { NumberBox } from 'devextreme-react/number-box';
import { Button } from 'devextreme-react/button';

const Controller = ({ jsonForm, setJsonForm }) => {
    const [formData, setFormData] = useState({
        fieldName: '',
        fieldLabel: '',
        placeholder: '',
        fieldType: '',
        options: [],
        required: false,
        position: 1
    });
    const [items, setItems] = useState([]);

    const [optionsFieldVisible, setOptionsFieldVisible] = useState(false);

    // Use a callback to handle custom item creation in TagBox
    const handleCustomItemCreating = useCallback((args) => {
        const newItem = args.text;
        const newOption = { value: newItem, label: newItem };
        if (!items.some(item => item.value === newOption.value)) {
            setItems(prevItems => [...prevItems, newOption]);
            setFormData(prevFormData => ({
                ...prevFormData,
                options: [...prevFormData.options, newOption]
            }));
        }
        args.customItem = newOption;
    }, [items]);

    // Update form data state
    const handleFieldChange = useCallback((field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value
        }));
    }, []);

    // Insert field into JSON form data
    const insertFieldInForm = useCallback(() => {
        const newFields = { ...formData };
        const jsonFormData = { ...jsonForm };

        // Convert options to the required format
        newFields.options = newFields.options.map(option => ({
            value: option.value,
            label: option.label
        }));

        // Insert the new field into the form fields array
        jsonFormData.formFields.splice(newFields.position, 0, newFields);
        setJsonForm(jsonFormData);
        console.log(jsonFormData);

        setFormData({
            fieldName: '',
            fieldLabel: '',
            placeholder: '',
            fieldType: '',
            options: [],
            required: false,
            position: 1
        });
        setItems([]);
    }, [formData, jsonForm, setJsonForm]);

    // Handle field type change to control TagBox visibility
    const handleFieldTypeChange = (e) => {
        const selectedType = e.value;
        handleFieldChange('fieldType', selectedType);

        // Show TagBox only if the selected field type requires options
        const fieldTypesWithOptions = ['select', 'radio', 'checkbox'];
        setOptionsFieldVisible(fieldTypesWithOptions.includes(selectedType));
    };

    return (
        <div>
            <div>
                <Form
                    formData={formData}
                    labelMode="outside"
                    labelLocation="top"
                    showColonAfterLabel={true}
                    width={"100%"}
                >
                    <SimpleItem dataField="fieldLabel" editorType="dxTextBox">
                        <TextBox
                            placeholder="Enter a field label"
                            showClearButton={true}
                            value={formData.fieldLabel}
                            onValueChanged={(e) => handleFieldChange('fieldLabel', e.value)}
                        />
                    </SimpleItem>
                    <SimpleItem dataField="fieldName" editorType="dxTextBox">
                        <TextBox
                            placeholder="Enter a field name"
                            showClearButton={true}
                            value={formData.fieldName}
                            onValueChanged={(e) => handleFieldChange('fieldName', e.value)}
                        />
                    </SimpleItem>
                    <SimpleItem dataField="fieldType" editorType="dxSelectBox">
                        <SelectBox
                            placeholder="Select a field type"
                            showClearButton={true}
                            dataSource={["text", "number", "select", "radio", "textarea", "checkbox", "date"]}
                            value={formData.fieldType}
                            onValueChanged={handleFieldTypeChange}
                        />
                    </SimpleItem>
                    <SimpleItem dataField="placeholder" editorType="dxTextBox">
                        <TextBox
                            placeholder="Enter a field placeholder"
                            showClearButton={true}
                            value={formData.placeholder}
                            onValueChanged={(e) => handleFieldChange('placeholder', e.value)}
                        />
                    </SimpleItem>
                    <SimpleItem dataField="required" editorType="dxSelectBox">
                        <SelectBox
                            placeholder="Is Required?"
                            showClearButton={true}
                            dataSource={[true, false]}
                            value={formData.required}
                            onValueChanged={(e) => handleFieldChange('required', e.value)}
                        />
                    </SimpleItem>
                    {optionsFieldVisible && (
                        <SimpleItem dataField="options" editorType="dxTagBox">
                            <TagBox
                                placeholder="Select or add options"
                                showClearButton={true}
                                items={items}
                                displayExpr="label"
                                valueExpr="value"
                                value={formData.options}
                                showSelectionControls={true}
                                acceptCustomValue={true}
                                onCustomItemCreating={handleCustomItemCreating}
                                onValueChanged={(e) => handleFieldChange('options', e.value)}
                            />
                        </SimpleItem>
                    )}
                    <SimpleItem dataField="position" editorType="dxNumberBox">
                        <NumberBox
                            placeholder="Enter a field position"
                            showClearButton={true}
                            min={1}
                            value={formData.position}
                            onValueChanged={(e) => handleFieldChange('position', e.value)}
                        />
                    </SimpleItem>
                </Form>
            </div>
            <div>
                <Button
                    text="Add Field"
                    style={{ marginTop: "10px" }}
                    onClick={insertFieldInForm}
                />
            </div>
        </div>
    );
};

export default Controller;
