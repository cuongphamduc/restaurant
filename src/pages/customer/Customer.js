import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN'
import './Customer.css'
// import { Table } from 'antd';
import Table from './../../components/table/Table'
import CreateForm from './components/create-form/CreateForm'
import customerApi from '../../api/CustomerApi';
import UpdateForm from './components/update-form/UpdateForm';
import DetailForm from './components/detail-form/DetailForm';
import { useNavigate } from 'react-router-dom';

const dataTest = [{
  ten: "vu tuan anh",
  sdt: "01234",
  ngaysinh: "23/09/123",
  diachi: "123"
}]

const Customer = () => {
  const columns = [
    {
      title: 'ID khách hàng',
      dataIndex: 'idkhachhang',
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
      title: 'Công ty',
      dataIndex: 'congty',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '25%',
    },
    {
      title: '',
      dataIndex: 'name',
      render: (text, data) => {
        return (
          <div className='bill-container__action'>
            <button className='bill-container__action-button bg-primary' onClick={() => {
              setCurrentCustomer(data)
              setIsVisibleDetailForm(true)
            }}><i class="bi bi-eye-fill"></i></button>
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

  const [isShowAddCustomer, setIsShowAddCustomer] = useState(false)
  const [nameCustomer, setNameCustomer] = useState(null)
  const [isVisibleCreateForm, setIsVisibleCreateForm] = useState(false)
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false)
  const [isVisibleDetailForm, setIsVisibleDetailForm] = useState(false)
  const [search, setSearch] = useState('')
  const [currentCustomer, setCurrentCustomer] = useState('')
  const [listCustomer, setListCustomer] = useState([])
  const [customerpaginition, setCustomerPaginition] = useState({
    page: 1,
    limit: 10,
    total_records: 0,
    total_pages: 0
  })
  var typingTimer;

  const getCustomerData = () => {
    (async () => {
      try {
        const { data, paginition } = await customerApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: customerpaginition.page,
          limit: customerpaginition.limit
        });
        setListCustomer(data);
        setCustomerPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
      } catch (error) {
        console.log('Failed to fetch customer list: ', error);
      }
    })();
  }

  function handlePageChange(newPage){
    (async () => {
      try {
        const { data, paginition } = await customerApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: newPage,
          limit: customerpaginition.limit
        });
        setListCustomer(data)
        setCustomerPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
      } catch (error) {
        console.log('Failed to fetch menu list: ', error);
      }
    })();
  }

  function onNumberItemChange(newNumberItem){
    (async () => {
      try {
        const { data, paginition } = await customerApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: 1,
          limit: newNumberItem
        });
        setListCustomer(data)
        setCustomerPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
      } catch (error) {
        console.log('Failed to fetch menu list: ', error);
      }
    })();
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
      doneTyping(e.target.value);
    }, 1000);
  }

  function doneTyping (value) {
    (async () => {
      try {
        const { data, paginition } = await customerApi.getAll({
          key: value,
          lower: "",
          upper: "",
          idhoadon: "",
          page: 1,
          limit: customerpaginition.limit
        });
        setListCustomer(data);
        setCustomerPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
        if (!data || data.length < 1){
          setNameCustomer(value)
          setIsShowAddCustomer(true)
        }
      } catch (error) {
        console.log('Failed to fetch customer list: ', error);
      }
    })();
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

  const handleExport = () => {
    var uri = "http://localhost:8000/xuatkhachhang";
    var name = "danhsachmonan"
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShorcutCustomer = (e) => {
    // Neu la Alt + O
    if (e.altKey && e.keyCode == 79) {
        if (window.location.pathname == "/customer"){
            setIsVisibleCreateForm(true)
        }
    }
    if (e.altKey && e.keyCode == 80) {
        if (window.location.pathname == "/customer"){
            handleExport()
        }
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleShorcutCustomer)
    getCustomerData()
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    function doc_keyUp_1(e) {

        // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
        if (e.altKey && e.which == 49) {
            // call your function to do the thing
            navigate("/")
        }
        if (e.altKey && e.which == 50) {
        // call your function to do the thing
        navigate("/menu")
        }
        if (e.altKey && e.which == 51) {
        // call your function to do the thing
        navigate("/customer")
        }
        if (e.altKey && e.which == 52) {
        // call your function to do the thing
        navigate("/bill")
        }
    }

    document.addEventListener('keyup', doc_keyUp_1)
  }, [])

  return (
    <div className="customer-container">
      <div className="customer-container__header">
        <div className="customer-container__title">Danh sách khách hàng</div>
        <div className="customer-container__tool-bar">
          <div className="customer-container__search">
            <input className="customer-container__input-search" onChange={onChangeSearch}></input>
          </div>
          {isShowAddCustomer &&  <button className="menu-container__add"
            onClick={() => {
              setIsVisibleCreateForm(true)
              setIsShowAddCustomer(false)
            }}
          >Thêm món vừa nhập</button>}
          <button className="customer-container__add" onClick={() => setIsVisibleCreateForm(true)}>Thêm mới</button>
          <button className="menu-container__export"
            onClick={() => handleExport()}
          >Trích xuất dữ liệu</button>
        </div>
      </div>
      <div className="customer-container__content">
      <Table onNumberItemChange={onNumberItemChange} onPageChange={handlePageChange} paginition={customerpaginition} isShowPaginition={true} columns={columns} dataSource={listCustomer}></Table>
      </div>
      <CreateForm
        name={nameCustomer}
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
      <DetailForm data={currentCustomer} visible={isVisibleDetailForm} setVisible={setIsVisibleDetailForm}></DetailForm>
    </div>
  )
}

export default Customer