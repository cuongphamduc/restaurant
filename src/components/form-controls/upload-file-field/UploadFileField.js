// import { Input } from 'antd';
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const Input = (props) => {
    const [value, setValue] = useState(props.value || '')
    const evention = {
        "target": {
            "value": "bta"
        }
    }

    return (
        <div className="input-container">
            <input
                id={props.id}
                className={`${(props.error) ? "input-container__error" : ""}`}
                type={props.type}
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    // setValue(e.target.value)
                    
                    props.onChange(e)
                }}
                value={props.value }
            />
            {
                props.error && <div className="input-container__error-message">{props.errorMessage}</div>
            }
        </div>
    )
}

const UploadFileField = (props) => {
    const { form, name, type, lable, disabled} = props
    const { formState } = form
    const { errors } = formState

    return (
        <Controller
            name={name}
            control={form.control}
            render={({field: {onChange, value, name}}) => (
                <Input
                    id={props.id}
                    // name={name}
                    onChange={e => {
                        
                        onChange(e)
                    }}
                    value={value}
                    type={type}
                    error={!!errors[name]}
                    errorMessage={errors[name] && errors[name].message}
                />
            )}
        >
        </Controller>
    )
}

export default UploadFileField