// import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Input from '../../input/Input'


const InputField = (props) => {
    const { form, name, type, lable, disabled} = props
    const { formState } = form
    let { errors } = formState

    useEffect(() => {
        errors = formState
    }, [form])

    return (
        <Controller
            name={name}
            control={form.control}
            render={({field: {onChange, value, name}}) => (
                <Input
                    // name={name}
                    id={props.id}
                    onChange={onChange}
                    value={value}
                    type={type}
                    placeholder={props.placeholder}
                    error={!!errors[name]}
                    errorMessage={errors[name] && errors[name].message}
                />
            )}
        >
        </Controller>
    )
}

export default InputField