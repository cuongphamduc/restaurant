import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN'
import './Customer.css'
// import { Table } from 'antd';
import Table from './../../components/table/Table'
import CreateForm from './components/create-form/CreateForm'
import customerApi from '../../api/CustomerApi';
import UpdateForm from './components/update-form/UpdateForm';

const Customer = () => {
  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'ten',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '20%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '15%',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaysinh',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '15%',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '30%',
    },
    {
      title: '',
      dataIndex: 'name',
      render: (text, data) => {
        return (
          <div className='bill-container__action'>
            <button className='bill-container__action-button bg-success' onClick={() => {
              setCurrentCustomer(data)
              setIsVisibleUpdateForm(true)
            }}><i class="bi bi-pencil-square"></i></button>
            <button className='bill-container__action-button bg-danger' onClick={() => handleRemove(data.sdt)}><i class="bi bi-trash"></i></button>
          </div>
        );
      },
      width: '20%',
    },
  ]

  const [isVisibleCreateForm, setIsVisibleCreateForm] = useState(false)
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false)
  const [search, setSearch] = useState('')
  const [currentCustomer, setCurrentCustomer] = useState('')
  const [listCustomer, setListCustomer] = useState([])

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

  const handleRemove = (sdt) => {
    (async () => {
      try {
        const { data } = await customerApi.remove(sdt);
      } catch (error) {
        console.log('Failed to remove customer: ', error);
      }
    })();
    getCustomerData()
  }

  useEffect(() => {
    getCustomerData()
  }, [])

  return (
    <div className="customer-container">
      <div className="customer-container__header">
        <div className="customer-container__title">Danh sách khách hàng</div>
        <div className="customer-container__tool-bar">
          <div className="customer-container__search">
            <input className="customer-container__input-search" onChange={onChangeSearch}></input>
            <button className="customer-container__button-search" onClick={handleSearch}>
              <i class="bi bi-search me-3"></i>
            </button>
          </div>
          <button className="customer-container__add" onClick={() => setIsVisibleCreateForm(true)}>Thêm mới</button>
        </div>
      </div>
      <div className="customer-container__content">
        <Table columns={columns} dataSource={listCustomer}></Table>
      </div>
      <CreateForm
        getCustomerData={getCustomerData}
        visible={isVisibleCreateForm}
        setVisible={setIsVisibleCreateForm}
      ></CreateForm>
      <UpdateForm
        data={currentCustomer}
        getCustomerData={getCustomerData}
        visible={isVisibleUpdateForm}
        setVisible={setIsVisibleUpdateForm}
      ></UpdateForm>
    </div>
  )
}

export default Customer