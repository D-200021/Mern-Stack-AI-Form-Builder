import React from 'react';
import { TextBox } from "devextreme-react/text-box";
import { NumberBox } from "devextreme-react/number-box";
import { SelectBox } from "devextreme-react/select-box";
import { RadioGroup } from "devextreme-react/radio-group";
import { TextArea } from "devextreme-react/text-area";
import { CheckBox } from "devextreme-react/check-box";
import { DateBox } from "devextreme-react/date-box";
import { TagBox } from "devextreme-react/tag-box";
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import "./FormUi.css";
import EditFields from './EditFields';
const FormUi = ({ jsonForm, onFieldUpdate, deleteField }) => {

  const renderFormField = (field, index) => {
    switch (field.fieldType) {
      case 'text':
        return (
          <div key={index} className="formfieldtags">
            <TextBox
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              width={"95%"}
            >
              <Validator>
                <RequiredRule message="This field is required" />
              </Validator>
            </TextBox>
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>

        );
      case 'number':
        return (
          <div className="formfieldtags">
            <NumberBox
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              width={"95%"}
            >

              <Validator>
                <RequiredRule message="This field is required" />
              </Validator>
            </NumberBox>
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );

      case 'select':
        return (
          <div className="formfieldtags">
            <SelectBox
              dataSource={field.options}
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              displayExpr={"value"}
              valueExpr={"value"}
              width={"95%"}
            />
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );

      case 'radio':
        return (
          <div className="formfieldtags">
            <RadioGroup
              dataSource={field.options}
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              layout='vertical'
              width={"95%"}
              displayExpr={"value"}
              valueExpr={"value"}
            />
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="formfieldtags">
            <TextArea
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              placeholder={field.placeholder}
              height={100}
              width={"95%"}
            />
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );

      case 'checkbox':
        if (field.options) {
          return (
            <div className="formfieldtags">
              <TagBox
                items={field.options}
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
              />
              <EditFields
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )
        } else {
          return (
            <div className="formfieldtags">
              <CheckBox
                text={field.label || field.fieldLabel}
                hint={field.placeholder}
                iconSize="25"
                width={"95%"}
              />
              <EditFields
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          );
        }

      case 'date':
        return (
          <div className="formfieldtags">
            <DateBox
              defaultValue={new Date()}
              label={field.label || field.fieldLabel}
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
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );

      default:
        return (
          <div className="formfieldtags">
            <TextBox
              label={field.label || field.fieldLabel}
              labelMode="outside"
              showClearButton={true}
              width={"95%"}
              placeholder={field.placeholder} />
            <EditFields
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        );
    }
  };

  return (
    <div className="formui">
      <h2 className='formuititle'>{jsonForm.formTitle}</h2>
      <h5 className='formuisubheading'>{jsonForm.formSubHeading || jsonForm.formSubheading}</h5>
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
