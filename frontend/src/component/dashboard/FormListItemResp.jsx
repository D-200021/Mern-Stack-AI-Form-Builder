import React from 'react';
import { Button } from "devextreme-react/button";
import * as XLSX from "xlsx";

const FormListItemResp = ({ formData }) => {

    const { formTitle, formSubHeading, formSubheading } = JSON.parse(formData.jsonform);


    const exportRecordHandler = async () => {
        try {
            const jsonData = [];
            const response = await fetch("/api/ai/userResponse/getFormResponseData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: formData.id,
                })
            });

            const data = await response.json();

            data.forEach((itr) => {
                const res = JSON.parse(itr.formData);
                jsonData.push(res);
            })
            exportToExcel(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    const exportToExcel = (jsonData) => {
        const data = jsonData;
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, formTitle);
        XLSX.writeFile(workbook, `${formTitle}.xlsx`);
    };

    return (
        <div className='formlistitem'>
            <div className='formListItemTitleContainer'>
                <h5 className='formListItemTitle'>{formTitle}</h5>
            </div>
            <h6 className='formListItemSubHeading'>{formSubHeading || formSubheading}</h6>
            <hr className='lineSpacing'></hr>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                {/* <h4><strong>45</strong> Responses</h4> */}
                <Button
                    text="Export"
                    onClick={exportRecordHandler}
                />
            </div>
        </div>
    )
}

export default FormListItemResp
