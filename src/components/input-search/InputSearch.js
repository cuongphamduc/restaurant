import React, { useEffect, useState } from 'react'
import './InputSearch.scss'

const InputSearch = (props) => {
    const [currentItem, setCurrentItem] = useState(null)
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
        setCurrentItem(null)
        setIsOpen(false)
    }

    const handleUnselect = () => {
        setIsOpen(false)
    }

    const handleOnChange = (event) => {
        props.setValue(event.target.value)
        props.onChange(event.target.value)
    }

    const handleMove = (e) => {
        if(e.keyCode == '13'){
            // e.preventDefault()
            handleSelect(props.data[currentItem])
        }
        if (e.keyCode == '38'){
            if (currentItem === null){
                setCurrentItem(0)
            }
            else if (currentItem > 0){
                setCurrentItem(currentItem - 1)
                document.getElementById("search-item-" + String(currentItem - 1)).scrollIntoView();
            }
        }
        if (e.keyCode == '40'){
            if (currentItem === null){
                setCurrentItem(0)
            }
            else if (currentItem < props.data.length - 1){
                setCurrentItem(currentItem + 1)
                document.getElementById("search-item-" + String(currentItem + 1)).scrollIntoView();
            }
        }
    }

    // useEffect(()=> {
    //     var searchContainer = document.getElementById("inputsearch-container")
    //     searchContainer.removeEventListener("keyup", handleMove, true)
    //     // searchContainer.addEventListener("keyup", handleMove)
    // }, [currentItem, data])

    // useEffect(()=> {
    //     var searchContainer = document.getElementById("inputsearch-container")
    //     searchContainer.addEventListener("keyup", handleMove)
    // }, [])

    return (
        <div id="inputsearch-container" className={`inputsearch-container `} onKeyDown={handleMove} tabIndex="0">
            <div
                className={`inputsearch-container__overlay ${
                isOpen ? 'inputsearch-container__overlay__active' : ''
                }`}
                onClick={handleUnselect}
            ></div>
            <input
            id={props.id}
            className={`inputsearch-container__header`}
            onFocus={() => setIsOpen(true)}
            onChange={handleOnChange}
            value={props.value}
            autocomplete="off"
            ></input>
           {isOpen && <div
            className={`inputsearch-container__select-box open`}
            >
            {isOpen && <div className="select-box__header">
                    <div className="select-box__header-name">Tên</div>
                    <div className="select-box__header-phone-number">Sđt</div>
                    <div className="select-box__header-company">Công ty</div>
                </div>
            }
            {isOpen && props.data?.map((item, index) => (
                <div
                    id={`search-item-${index}`}
                    key={index}
                    className={`inputsearch-container__select-box__item ocr-designer__tooltip ${currentItem == Number(index) ? "inputsearch-container__active-item" : ""}`}
                    data-style="tooltip"
                    data-tip={item}
                    data-placement="bottom"
                    onClick={() => handleSelect(item)}
                >
                    <div className="item__name">{item.ten}</div>
                    <div className="item__phone-number">{item.sdt}</div>
                    <div className="item__company">{item.congty}</div>
                </div>
            ))}
            </div>}
        </div>
    )
}

export default InputSearch