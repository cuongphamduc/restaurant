import React, { useEffect, useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SelectCustomer.css'
import customerApi from '../../../../api/CustomerApi';

const data =[
    {
        ten: "Vu Tuan Anh",
        sdt: "0123456789",
        ngaysinh: "23/09/1997",
        diachi: "Thanh Mai, Hà Nội"
    },
    {
        ten: "Vu Tuan Anh 2",
        sdt: "0123456789",
        ngaysinh: "23/09/1997",
        diachi: "Thanh Mai, Hà Nội"
    }
]

const SelectCustomer = ({onSelect, close}) => {
    const [search, setSearch] = useState("")
    const [listCustomer, setListCustomer] = useState([])

    const handleSelect = (dataCustomer) => {
        onSelect(dataCustomer)
        close()
    }

    const getCustomerData = () => {
        (async () => {
          try {
            const { data } = await customerApi.getAll({
              key: search,
              lower: "",
              upper: "",
              idhoadon: ""
            });
            setListCustomer(data);
          } catch (error) {
            console.log('Failed to fetch customer list: ', error);
          }
        })();
      }

      const onChangeSearch = (e) => {
        setSearch(e.target.value)
      }
    
      const handleSearch = () => {
        getCustomerData()
      }

    useEffect(() => {
        getCustomerData()
    }, [])

  return (
    <div className='select-customer-container'>
        <div className="select-customer-container__search">
            <input onChange={onChangeSearch}></input>
            <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className="select-customer-container__list">
            <div className="list-customer__header">
                <div className="list-customer__header__item name">Tên khách hàng</div>
                <div className="list-customer__header__item phone-number">Số điện thoại</div>
                <div className="list-customer__header__item birthday">Ngày sinh</div>
                <div className="list-customer__header__item address">Địa chỉ</div>
            </div>
            <div className="list-customer__content">
            {
                listCustomer.map((customer) => {
                    return (
                        <div
                            className="list-customer__line"
                            onClick={() => handleSelect(customer)}
                        >
                            <div className="list-customer__content__item name">{customer.ten}</div>
                            <div className="list-customer__content__item phone-number">{customer.sdt}</div>
                            <div className="list-customer__content__item birthday">{customer.ngaysinh}</div>
                            <div className="list-customer__content__item address">{customer.diachi}</div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    </div>
  )
}

export default SelectCustomer