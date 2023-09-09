import React, { useState } from 'react'
import './InputSearch.scss'

const InputSearch = (props) => {
    const [isOpen, setIsOpen] = useState(false)  


    const data = [{
        sdt: "0123123",
        ten: "Vu Tuan Anh"
    },
    {
        sdt: "0123189345",
        ten: "Pham Duc Cuong"
    }]

    const handleSelect = (item) => {
        props.onSelect(item)
        setIsOpen(false)
    }

    const handleUnselect = () => {
        setIsOpen(false)
        console.log("click")
    }

    const handleOnChange = (event) => {
        props.setValue(event.target.value)
        props.onChange(event.target.value)
    }

    return (
        <div className={`inputsearch-container `}>
            <div
                className={`inputsearch-container__overlay ${
                isOpen ? 'inputsearch-container__overlay__active' : ''
                }`}
                onClick={handleUnselect}
            ></div>
            <input
            className={`inputsearch-container__header`}
            onFocus={() => setIsOpen(true)}
            onChange={handleOnChange}
            value={props.value}
            ></input>
           {isOpen && <div
            className={`inputsearch-container__select-box open`}
            >
            {isOpen && props.data?.map((item, index) => (
                <div
                    key={index}
                    className="inputsearch-container__select-box__item ocr-designer__tooltip"
                    data-style="tooltip"
                    data-tip={item}
                    data-placement="bottom"
                    onClick={() => handleSelect(item)}
                >
                    {item.ten} - {item.sdt}
                </div>
            ))}
            </div>}
        </div>
    )
}

export default InputSearch