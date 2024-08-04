import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TextBox } from "devextreme-react/text-box";
import { NumberBox } from "devextreme-react/number-box";
import { SelectBox } from "devextreme-react/select-box";
import { RadioGroup } from "devextreme-react/radio-group";
import { TextArea } from "devextreme-react/text-area";
import { CheckBox } from "devextreme-react/check-box";
import { DateBox } from "devextreme-react/date-box";
import { TagBox } from "devextreme-react/tag-box";
import { Button } from "devextreme-react/button";
import {
    Validator,
    RequiredRule,
} from 'devextreme-react/validator';
import { v4 as uuidv4 } from 'uuid';
import "./AiForm.css";
import formLogo from "../../assets/form.png";

const LiveAiForm = () => {
    const { formId } = useParams();
    const [JSONForm, setJSONForm] = useState('');
    const [formData, setFormData] = useState();
    const formRef = useRef();
    const navigate = useNavigate();

    const getFormData = async () => {
        try {
            const result = await fetch("/api/ai/getRecordById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: formId,
                }),
            });
            if (result.ok) {
                const data = await result.json();
                const parseData = JSON.parse(data);
                setJSONForm(parseData);
                console.log(parseData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const renderFormField = (field, index) => {
        switch (field.fieldType) {
            case 'text':
                return (
                    <div key={index} className="formfieldtags">
                        <TextBox
                            label={field.label || field.fieldLabel}
                            name={field.fieldName}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            width={"95%"}
                        >
                        </TextBox>
                    </div>

                );
            case 'number':
                return (
                    <div className="formfieldtags">
                        <NumberBox
                            label={field.label || field.fieldLabel}
                            name={field.fieldName}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            width={"95%"}

                        >

                        </NumberBox>
                    </div>
                );

            case 'select':
                return (
                    <div className="formfieldtags">
                        <SelectBox
                            dataSource={field.options}
                            name={field.fieldName}
                            label={field.label || field.fieldLabel}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            displayExpr={"value"}
                            valueExpr={"value"}
                            width={"95%"}

                        >

                        </SelectBox>
                    </div>
                );

            case 'radio':
                return (
                    <div className="formfieldtags">
                        <RadioGroup
                            dataSource={field.options}
                            name={field.fieldName}
                            label={field.label || field.fieldLabel}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            layout='vertical'
                            width={"95%"}
                            displayExpr={"value"}
                            valueExpr={"value"}

                        >
                        </RadioGroup>
                    </div>
                );

            case 'textarea':
                return (
                    <div className="formfieldtags">
                        <TextArea
                            label={field.label || field.fieldLabel}
                            name={field.fieldName}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            height={100}
                            width={"95%"}
                        >

                        </TextArea>
                    </div>
                );

            case 'checkbox':
                if (field.options) {
                    return (
                        <div className="formfieldtags">
                            <TagBox
                                items={field.options}
                                name={field.fieldName}
                                searchEnabled={true}
                                showSelectionControls={true}
                                maxDisplayedTags={5}
                                label={field.label || field.fieldLabel}
                                labelMode="outside"
                                showClearButton={true}
                                placeholder={field.placeholder}
                                layout='vertical'
                                width={"95%"}
                                displayExpr={"value"}
                                valueExpr={"value"}

                            >
                            </TagBox>
                        </div>
                    )
                } else {
                    return (
                        <div className="formfieldtags">
                            <CheckBox
                                text={field.label || field.fieldLabel}
                                name={field.fieldName}
                                hint={field.placeholder}
                                iconSize="25"
                                width={"95%"}

                            >

                            </CheckBox>
                        </div>
                    );
                }

            case 'date':
                return (
                    <div className="formfieldtags">
                        <DateBox
                            defaultValue={new Date()}
                            name={field.fieldName}
                            label={field.label || field.fieldLabel}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                            format="dd/MM/yyyy"
                            pickerType='calendar'
                            type="date"
                            width={"95%"}

                        >

                        </DateBox>
                    </div>
                );

            default:
                return (
                    <div className="formfieldtags">
                        <TextBox
                            label={field.label || field.fieldLabel}
                            name={field.fieldName}
                            width={"95%"}
                            labelMode="outside"
                            showClearButton={true}
                            placeholder={field.placeholder}
                        >
                        </TextBox>
                    </div>
                );
        }
    };

    const submitResponseHandler = async () => {

        const length = formRef.current.length;
        const data = {};

        for (var i = 0; i < length; i++) {
            if (formRef.current[i].name) {
                data[formRef.current[i].name] = formRef.current[i].value;
            }
        }

        const response = await fetch("/api/ai/userResponse/submitResponse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uuidv4(),
                formId: formId,
                formData: JSON.stringify(data),
            }),
        });

        if (response.ok) {
            alert("Form Submitted Successfully");
            formRef.current.reset();
        } else {
            alert("Error Occured");
        }
    }

    useEffect(() => {
        formId && getFormData();
    }, [formId]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div className='AiFormFooterlive' onClick={() => { navigate("/") }}>
                <img src={formLogo} width="50" height="26" />
                Build your own form with AI.
            </div>
            <div className="formuilive">
                <h2 className='formuititlelive'>{JSONForm.formTitle}</h2>
                <h5 className='formuisubheadinglive'>{JSONForm.formSubHeading || JSONForm.formSubheading}</h5>
                <form ref={formRef} style={{ width: "100%" }} >
                    {JSONForm.formFields?.map((field, index) => (
                        <div key={index} className='formfieldlive'>
                            {renderFormField(field, index)}
                        </div>
                    ))}
                    <Button
                        text={JSONForm.submitButton?.label || "Submit"}
                        style={{
                            marginLeft: "2.4%",
                        }}
                        onClick={submitResponseHandler}
                    />
                </form>
            </div>
        </div>

    )
}

export default LiveAiForm
