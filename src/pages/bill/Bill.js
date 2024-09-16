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
import axios from 'axios';
import ConfirmRemove from '../../components/confirm-remove/ConfirmRemove';
import DropDown from '../../components/dropdown/DropDown';


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
          {((data?.danhxung == "" || data?.danhxung == undefined) ? "" : data?.danhxung) + ((data?.ho == "") ? "" : (" " + data?.ho)) + ((data?.tendem == "") ? "" : (" " + data?.tendem)) + ((data?.ten == "") ? "" : (" " + data?.ten))}
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
          {Intl.NumberFormat().format(text)}
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

const listSort = [
  "Mã hóa đơn",
  "Họ",
  "Tên"
]

const [typeSort, setTypeSort] = useState("Mã hóa đơn")

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
          kieusx: 0,
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

  const onSelectSort = (name, value) => {
    setTypeSort(value);
    (async () => {
      try {
        let _typeSort = 0
        if (value == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (value == "Họ"){
          _typeSort = 1
        }
        if (value == "Tên"){
          _typeSort = 2
        }

        const { data, paginition } = await billApi.getAll({
          key:search,
          lower: fromTime,
          upper: toTime,
          kieusx: _typeSort,
          page: billPaginition.page,
          limit: billPaginition.limit,
        });
        setListBill(data);
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

  function handlePageChange(newPage){
    (async () => {
      try {
        let _typeSort = 0
        if (typeSort == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (typeSort == "Họ"){
          _typeSort = 1
        }
        if (typeSort == "Tên"){
          _typeSort = 2
        }

        const { data, paginition } = await billApi.getAll({
          key: search,
          lower: fromTime,
          upper: toTime,
          kieusx: _typeSort,
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
        let _typeSort = 0
        if (typeSort == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (typeSort == "Họ"){
          _typeSort = 1
        }
        if (typeSort == "Tên"){
          _typeSort = 2
        }
        const { data, paginition } = await billApi.getAll({
          key: search,
          lower: fromTime,
          upper: toTime,
          kieusx: _typeSort,
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
        let _typeSort = 0
        if (typeSort == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (typeSort == "Họ"){
          _typeSort = 1
        }
        if (typeSort == "Tên"){
          _typeSort = 2
        }
        const { data, paginition } = await billApi.getAll({
          key:value,
          lower: fromTime,
          upper: toTime,
          kieusx: _typeSort,
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
        let _typeSort = 0
        if (typeSort == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (typeSort == "Họ"){
          _typeSort = 1
        }
        if (typeSort == "Tên"){
          _typeSort = 2
        }
        const { data, paginition } = await billApi.getAll({
          key:search,
          lower: dayString[0],
          upper: dayString[1],
          kieusx: _typeSort,
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
    // axios.get("http://localhost:8000/xuathoadon", { params:{
    //   key:search,
    //   lower: fromTime,
    //   upper: toTime,
    //   page: 1,
    //   limit: 0,
    // }}, { responseType: 'blob' }).then(blob=>{
    //   const url = window.URL.createObjectURL(blob.data); 
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = "danhsachhoadon"  
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // })
    let _typeSort = 0
        if (typeSort == "Mã hóa đơn"){
          _typeSort = 0
        }
        if (typeSort == "Họ"){
          _typeSort = 1
        }
        if (typeSort == "Tên"){
          _typeSort = 2
        }

    var uri = `http://localhost:8000/xuathoadon?key=${search}&lower=${fromTime}&upper=${toTime}&kieusx=${_typeSort}&page=1&limit=0`;
    var name = "danhsachmonan"
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShorcutBill = (e) => {
    // Neu la Alt + a
    if (e.altKey && e.which == 65) {
        if (window.location.pathname == "/bill"){
            setIsVisibleCreateForm(true)
        }
    }
    if (e.altKey && e.ctrlKey && e.keyCode == 69) {
      if (window.location.pathname == "/bill"){
          document.getElementById("exportBill").click()
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
            <DropDown className="bill-container-dropdown" headerClassName="bill-container-filter" selected={typeSort} listItem={listSort} onSelected={onSelectSort}></DropDown>
            <DatePicker.RangePicker onChange={onChangeDate} status="warning" style={{ width: '100%', "background-color": "#b7b9bf"}}/>
            <input onChange={onChangeSearch} className="bill-container__input-search"></input>
          </div>
          <button className="bill-container__add"
            onClick={() => setIsVisibleCreateForm(true)}
          >Thêm mới</button>
          <button className="menu-container__export" id="exportBill"
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