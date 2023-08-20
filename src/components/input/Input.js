import React, { useState } from 'react'
import './Input.css'

const Input = (props) => {
    const [value, setValue] = useState(props.value || '')

    return (
        <div className="input-container">
            <div className="input-container__info">
                <input
                    id={props.id}
                    className={`${(props.error) ? "input-container__error" : ""}`}
                    type={props.type}
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
        </div>
    )
}

export default Input