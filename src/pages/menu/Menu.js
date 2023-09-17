import React, { useContext, useEffect } from 'react'
import './Menu.css'
import Dish from './components/dish/Dish'
import vi_VN from 'antd/lib/locale/vi_VN'
import Pagination from '../../components/pagination/Pagination'
import CreateFormMenu from './components/create-form/CreateForm'
import Modal from './../../components/modal/Modal'
import { useState } from 'react'
import menuApi from './../../api/MenuApi'
import UpdateForm from './components/update-form/UpdateForm'
import DropDown from '../../components/dropdown/DropDown'
import { useNavigate } from 'react-router-dom'
import { Shortcut } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCreateFormMenu } from './MenuSlice'

const Menu = () => {
  const [isShowAddDish, setIsShowAddDish] = useState(false)
  const [nameDish, setNameDish] = useState(null)
  const [search, setSearch] = useState("")
  const [menuList, setMenuList] = useState([])
  const [menuPaginition, setMenuPaginition] = useState({
    page: 1,
    limit: 10,
    total_records: 0,
    total_pages: 0
  })
  const isVisibleCreateForm = useSelector((state) => state.menu.isCreateFormMenu)
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false)
  const [currentDish, setCurrentDish] = useState('')
  const dispatch = useDispatch()

  const handleSetIsShowCreateForm = (value) => {
    setIsShowAddDish(false)
    dispatch(setIsCreateFormMenu(value))
  }

  var typingTimer;

  const paginition1 = {
      page: 1,
      size: 5,
      totalPage: 4,
      totalItem: 20
  }

  function handlePageChange(newPage){
    (async () => {
      try {
        const { data, paginition } = await menuApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: newPage,
          limit: menuPaginition.limit
        });
        setMenuList(data);
        setMenuPaginition({
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
        const { data, paginition } = await menuApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          page: 1,
          limit: newNumberItem
        });
        setMenuList(data);
        setMenuPaginition({
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

  const getMenuData = () => {
    (async () => {
      try {
        const { data, paginition } = await menuApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: "",
          nhommonan: 10,
          page: menuPaginition.page,
          limit: menuPaginition.limit
        });
        setMenuList(data);
        setMenuPaginition({
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
        const { data, paginition } = await menuApi.getAll({
          key: value,
          lower: "",
          upper: "",
          idhoadon: "",
          page: 1,
          limit: menuPaginition.limit
        });
        setMenuList(data);
        setMenuPaginition({
          page: paginition.page,
          limit: paginition.limit,
          totalPage: paginition.total_pages,
          totalItem: paginition.total_records
        })
        if (!data || data.length < 1){
          setNameDish(value)
          setIsShowAddDish(true)
        }
      } catch (error) {
        console.log('Failed to fetch menu list: ', error);
      }
    })();
  }

  const handleSearch = () => {
    getMenuData()
  }

  const handleEdit = (dish) => {
    setCurrentDish(dish)
    setIsVisibleUpdateForm(true)
  }

  const handleRemove = (dish) => {
    (async () => {
      try {
        const { data } = await menuApi.remove(dish.tenmonan);
      } catch (error) {
        console.log('Failed to remove menu: ', error);
      }
    })();
    getMenuData()
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

  const handleShorcutMenu = (e) => {
    // Neu la Alt + O
    if (e.altKey && e.which == 79) {
        if (window.location.pathname == "/menu"){
            dispatch(setIsCreateFormMenu(true))
        }
    }
  }

  useEffect(() => {
      document.addEventListener("keyup", handleShorcutMenu)
      getMenuData()
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

  const listDish = [
    "Tất cả",
    "Đồ ăn",
    "Đồ ăn kèm",
    "Đồ uống"
  ]

  const [typeDish, setTypeDish] = useState("Tất cả")

  const onSelectDish = (name, value) => {
    console.log("change")
    setTypeDish(value);
    (async () => {
      try {
        let _typeDish = 0
        if (value == "Đồ ăn"){
          _typeDish = 0
        }
        if (value == "Đồ ăn kèm"){
          _typeDish = 1
        }
        if (value == "Đồ uống"){
          _typeDish = 2
        }
        if (value == "Tất cả"){
          _typeDish = 10
        }
        console.log("ok")

        const { data, paginition } = await menuApi.getAll({
          key: value,
          lower: "",
          upper: "",
          idhoadon: "",
          nhommonan: _typeDish,
          page: 1,
          limit: menuPaginition.limit
        });
        setMenuList(data);
        setMenuPaginition({
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

  return (
    <div tabindex="0" id="menu-container" className="menu-container">
      <div className="menu-container__header">
        <div id="menu-container__title" className="menu-container__title">Thực đơn</div>
        <div className="menu-container__tool-bar">
          <DropDown headerClassName="menu-container-filter" selected={typeDish} listItem={listDish} onSelected={onSelectDish}></DropDown>
          <div className="menu-container__search">
            <input onChange={onChangeSearch} className="menu-container__input-search"></input>
          </div>
          {isShowAddDish &&  <button className="menu-container__add"
            onClick={() => handleSetIsShowCreateForm(true)}
          >Thêm món vừa nhập</button>}
          <button className="menu-container__add"
            onClick={() => handleSetIsShowCreateForm(true)}
          >Thêm món</button>
          <button className="menu-container__export"
            onClick={() => handleExport()}
          >Trích xuất dữ liệu</button>
        </div>
      </div>
      <div id="menu-container__content" className="menu-container__content">
        <div className="menu-container__list">
          {
            menuList.map((menu, index) => {
              return (
                <Dish isEdit={true} onRemove={handleRemove} onEdit={handleEdit} data={menu}></Dish>
              )
            })
          }
        </div>
      </div>
      <div className="menu-container__paginition">
        <Pagination
          pagination={menuPaginition}
          onPageChange={handlePageChange}
          onNumberItemChange={onNumberItemChange}
        ></Pagination>
      </div>
      <CreateFormMenu
        name={nameDish}
        getMenuData={getMenuData}
        visible={isVisibleCreateForm}
        setVisible={handleSetIsShowCreateForm}
      ></CreateFormMenu>
      <UpdateForm
        data={currentDish}
        getMenuData={getMenuData}
        visible={isVisibleUpdateForm}
        setVisible={setIsVisibleUpdateForm}
      ></UpdateForm>
    </div>
  )
}

export default Menu