import React, { useEffect, useState } from 'react';
import FormListItemResp from "./FormListItemResp";
import "./Response.css"

const Responses = ({ jsonFormData }) => {

    return (
        <div className='pntresponsesform'>
            <div className='responsesformheader'>
                <h2 className='responseseditortitle'>Responses</h2>
            </div>
            <div className='responseformitemmain'>
                {
                    jsonFormData && jsonFormData?.map((data, index) => {
                        return (
                            <div key={index}>
                                <FormListItemResp
                                    formData={data}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Responses
