import React, { useEffect } from 'react'
import "./FormList.css"
import FormListItem from './FormListItem';
const FormList = () => {

    const userDetail = localStorage.getItem("user");
    const { email } = userDetail ? JSON.parse(userDetail) : {};
    const [formList, setFormList] = React.useState([]);

    useEffect(() => {
        email && getFormList();
    }, [email])

    const getFormList = async () => {
        try {
            const response = await fetch("/api/ai/getFormList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                })
            });
            const data = await response.json();
            setFormList(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='formlist'>
            {formList.map((form, index) => {
                return (
                    <div key={index}>
                        <FormListItem
                            form={form}
                            getFormList={getFormList}
                        />
                    </div>
                )
            })

            }
        </div>
    )
}

export default FormList
