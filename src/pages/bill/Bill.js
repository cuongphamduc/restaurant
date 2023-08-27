import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN'
import './Bill.css'
// import { Table } from 'antd';
import Table from './../../components/table/Table'
import CreateForm from './components/create-form/CreateForm';
import { DatePicker } from 'antd';
import billApi from '../../api/BillApi';

const columns = [
  {
    title: 'Mã hóa đơn',
    dataIndex: 'idhoadon',
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
    title: 'Khách hàng',
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
    title: 'Tổng tiền',
    dataIndex: 'tong',
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
    title: 'Ngày tạo',
    dataIndex: 'thoigian',
    render: (text, data) => {
      return (
        <span>
          {text}
        </span>
      );
    },
    width: '15%',
  },
  // {
  //   title: '',
  //   dataIndex: 'name',
  //   render: (text, data) => {
  //     return (
  //       <div className='bill-container__action'>
  //         <button className='bill-container__action-button bg-danger'><i class="bi bi-trash"></i></button>
  //       </div>
  //     );
  //   },
  //   width: '15%',
  // },
]

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    idhoadon: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Bill = () => {
  const [isVisibleCreateForm, setIsVisibleCreateForm] = useState(false)
  const [search, setSearch] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [listBill, setListBill] = useState([])
  const [billPaginition, setBillPaginition] = useState({
    page: 1,
    limit: 10,
    total_records: 0,
    total_pages: 0
  })

  const getBillData = () => {
    (async () => {
      try {
        const { data, paginition } = await billApi.getAll({
          key:search,
          lower: fromTime,
          upper: toTime,
          page: billPaginition.page,
          limit: billPaginition.limit,
        });
        setListBill(data)
        setBillPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
      } catch (error) {
        console.log('Failed to fetch bill list: ', error);
      }
    })();
  }

  function handlePageChange(newPage){
    (async () => {
      try {
        const { data, paginition } = await billApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: newPage,
          limit: billPaginition.limit
        });
        setListBill(data)
        setBillPaginition({
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
        const { data, paginition } = await billApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: billPaginition.page,
          limit: newNumberItem
        });
        setListBill(data)
        setBillPaginition({
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
  }

  const onChangeDate = (dayjs, dayString) => {
    setFromTime(dayString[0])
    setToTime(dayString[1])
  }

  const handleSearch = () => {
    getBillData()
  }

  useEffect(() => {
    console.log("bill")
    getBillData()
  }, [])

  return (
    <div className="bill-container">
      <div className="bill-container__header">
        <div className="bill-container__title">Danh sách hóa đơn</div>
        <div className="bill-container__tool-bar">
          <div className="bill-container__search">
            <DatePicker.RangePicker onChange={onChangeDate} status="warning" style={{ width: '100%', "background-color": "#b7b9bf"}}/>
            <input onChange={onChangeSearch} className="bill-container__input-search"></input>
            <button className="bill-container__button-search" onClick={handleSearch}>
              <i class="bi bi-search me-3"></i>
            </button>
          </div>
          <button className="bill-container__add"
            onClick={() => setIsVisibleCreateForm(true)}
          >Thêm mới</button>
        </div>
      </div>
      <div className="bill-container__content">
        <Table onNumberItemChange={onNumberItemChange} onPageChange={handlePageChange} paginition={billPaginition} isShowPaginition={true} columns={columns} dataSource={listBill}></Table>
      </div>
      <CreateForm
        getBillData={getBillData}
        visible={isVisibleCreateForm}
        setVisible={setIsVisibleCreateForm}
      ></CreateForm>
    </div>
  )
}

export default Bill