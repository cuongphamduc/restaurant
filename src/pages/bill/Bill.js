import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN'
import './Bill.css'
// import { Table } from 'antd';
import Table from './../../components/table/Table'
import CreateForm from './components/create-form/CreateForm';
import { DatePicker } from 'antd';
import billApi from '../../api/BillApi';
import DetailForm from '../bill/components/detail-form/DetailForm';


const Bill = () => {
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
  {
    title: '',
    dataIndex: 'name',
    render: (text, data) => {
      return (
        <div className='bill-container__action'>
          <button onClick={() => {
              setCurrentBill(data)
              setIsVisibleDetailForm(true)
            }} className='bill-container__action-button bg-primary'><i class="bi bi-eye-fill"></i></button>
        </div>
      );
    },
    width: '15%',
  },
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

  const [isVisibleCreateForm, setIsVisibleCreateForm] = useState(false)
  const [isVisibleDetailForm, setIsVisibleDetailForm] = useState(false)
  const [currentBill, setCurrentBill] = useState('')
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
          page: 1,
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

  var typingTimer;
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
        const { data, paginition } = await billApi.getAll({
          key:value,
          lower: fromTime,
          upper: toTime,
          page: 1,
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

  const onChangeDate = (dayjs, dayString) => {
    setFromTime(dayString[0]);
    setToTime(dayString[1]);
    (async () => {
      try {
        const { data, paginition } = await billApi.getAll({
          key:search,
          lower: dayString[0],
          upper: dayString[1],
          page: 1,
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

  const handleSearch = () => {
    getBillData()
  }

  const handleExport = () => {
    var uri = "";
    var name = "danhsachmonan"
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShorcutBill = (e) => {
    // Neu la Alt + O
    if (e.altKey && e.which == 79) {
        if (window.location.pathname == "/bill"){
            setIsVisibleCreateForm(true)
        }
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleShorcutBill)
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
          </div>
          <button className="bill-container__add"
            onClick={() => setIsVisibleCreateForm(true)}
          >Thêm mới</button>
          <button className="menu-container__export"
            onClick={() => handleExport()}
          >Trích xuất dữ liệu</button>
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
      <DetailForm
        visible={isVisibleDetailForm}
        setVisible={setIsVisibleDetailForm}
        data={currentBill}
      ></DetailForm>
    </div>
  )
}

export default Bill