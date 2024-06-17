import React from 'react';
import { TextBox } from "devextreme-react/text-box";
import { NumberBox } from "devextreme-react/number-box";
import { SelectBox } from "devextreme-react/select-box";
import { RadioGroup } from "devextreme-react/radio-group";
import { TextArea } from "devextreme-react/text-area";
import { CheckBox } from "devextreme-react/check-box";
import { DateBox } from "devextreme-react/date-box";
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import "./FormUi.css";
import EditFields from './EditFields';
const FormUi = ({ jsonForm }) => {

  const renderFormField = (field, index) => {
    switch (field.fieldType) {
      case 'text':
        return (
          <div key={index} className="formfieldtags">
            <TextBox
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              width={"95%"}
            >
              <Validator>
                <RequiredRule message="This field is required" />
              </Validator>
            </TextBox>
            <EditFields />
          </div>

        );
      case 'number':
        return (
          <div className="formfieldtags">
            <NumberBox
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              width={"90%"}
            >

              <Validator>
                <RequiredRule message="This field is required" />
              </Validator>
            </NumberBox>
            <EditFields />
          </div>
        );

      case 'select':
        return (
          <div className="formfieldtags">
            <SelectBox
              dataSource={field.options}
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              displayExpr={"label"}
              valueExpr={"value"}
              width={"95%"}
            />
            <EditFields />
          </div>
        );

      case 'radio':
        return (
          <div className="formfieldtags">
            <RadioGroup
              dataSource={field.options}
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              layout='vertical'
              width={"95%"}
            />
            <EditFields />
          </div>
        );

      case 'textarea':
        return (
          <div className="formfieldtags">
            <TextArea
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              height={100}
              width={"95%"}
            />
            <EditFields />
          </div>
        );

      case 'checkbox':
        return (
          <div className="formfieldtags">
            <CheckBox
              text={field.label}
              hint={field.placeholder}
              iconSize="25"
              width={"95%"}
            />
            <EditFields />
          </div>
        );

      case 'date':
        return (
          <div className="formfieldtags">
            <DateBox
              defaultValue={new Date()}
              label={field.label}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              format="dd/MM/yyyy"
              pickerType='calendar'
              type="date"
              width={"95%"}
            >
              <Validator>
                <RequiredRule message="This field is required" />
              </Validator>
            </DateBox>
            <EditFields />
          </div>
        );

      default:
        return (
          <div className="formfieldtags">
            <TextBox label={field.label} width={"95%"} />
            <EditFields />
          </div>
        );
    }
  };

  return (
    <div className="formui">
      <h2 className='formuititle'>{jsonForm.formTitle}</h2>
      <h5 className='formuisubheading'>{jsonForm.formSubHeading}</h5>
      <form >
        {jsonForm.formFields?.map((field, index) => (
          <div key={index} className='formfield'>
            {renderFormField(field, index)}
          </div>
        ))}
      </form>
    </div>
  )
}

export default FormUi
