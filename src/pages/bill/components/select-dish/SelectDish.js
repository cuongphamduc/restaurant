import React, { useEffect, useState } from 'react'
import Dish from '../../../menu/components/dish/Dish'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SelectDish.css'
import menuApi from './../../../../api/MenuApi'

const data = [
    {
        tenmonan: "Ga",
        hinhanh: "", 
        gia: 100000,
        mota: "Ga nuong"
    },
    {
        tenmonan: "Ga",
        hinhanh: "", 
        gia: 100000,
        mota: "Ga nuong"
    },
    {
        tenmonan: "Ga",
        hinhanh: "", 
        gia: 100000,
        mota: "Ga nuong"
    },
    {
        tenmonan: "Ga",
        hinhanh: "", 
        gia: 100000,
        mota: "Ga nuong"
    },
    {
        tenmonan: "Ga",
        hinhanh: "", 
        gia: 100000,
        mota: "Ga nuong"
    }
]

const SelectDish = ({onSelect, close}) => {
    const [search, setSearch] = useState("")
    const [menuList, setMenuList] = useState([])

    const getMenuData = () => {
        (async () => {
          try {
            const { data } = await menuApi.getAll({
              key: search,
              lower: "",
              upper: "",
              idhoadon: "",
              page: 1,
              limit: 0
            });
            setMenuList(data);
          } catch (error) {
            console.log('Failed to fetch menu list: ', error);
          }
        })();
      }

      const onChangeSearch = (e) => {
        setSearch(e.target.value)
      }
    
      const handleSearch = () => {
        getMenuData()
      }

    useEffect(() => {
        getMenuData()
    }, [])

    const handleSelect = (dataDish) => {
        onSelect(dataDish)
        close()
    }

    return (
        <div className='select-dish-container'>
            <div className="select-dish-container__search">
                <input onChange={onChangeSearch}></input>
                <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div className="select-dish-container__content">
                <div className="select-dish-container__list">
                {
                    menuList.map((menu, index) => {
                    return (
                        <Dish data={menu} onClick={() => handleSelect(menu)}></Dish>
                    )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default SelectDish