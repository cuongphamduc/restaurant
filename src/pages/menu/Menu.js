import React, { useEffect } from 'react'
import './Menu.css'
import Dish from './components/dish/Dish'
import vi_VN from 'antd/lib/locale/vi_VN'
import Pagination from '../../components/pagination/Pagination'
import CreateForm from './components/create-form/CreateForm'
import Modal from './../../components/modal/Modal'
import { useState } from 'react'
import menuApi from './../../api/MenuApi'
import UpdateForm from './components/update-form/UpdateForm'

const Menu = () => {
  const [search, setSearch] = useState("")
  const [menuList, setMenuList] = useState([])
  const [isVisibleCreateForm, setIsVisibleCreateForm] = useState(false)
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false)
  const [currentDish, setCurrentDish] = useState('')

  const paginition1 = {
      page: 1,
      size: 5,
      totalPage: 4,
      totalItem: 20
  }

  function handlePageChange(newPage){
      console.log(newPage)
  }

  const getMenuData = () => {
    (async () => {
      try {
        const { data } = await menuApi.getAll({
          key: search,
          lower: "",
          upper: "",
          idhoadon: ""
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

  useEffect(() => {
    getMenuData()
  }, [])


  return (
    <div className="menu-container">
      <div className="menu-container__header">
        <div className="menu-container__title">Thực đơn</div>
        <div className="menu-container__tool-bar">
          <div className="menu-container__search">
            <input onChange={onChangeSearch} className="menu-container__input-search"></input>
            <button className="menu-container__button-search"
              onClick={handleSearch}
            >
              <i class="bi bi-search me-3"></i>
            </button>
          </div>
          <button className="menu-container__add"
            onClick={() => setIsVisibleCreateForm(true)}
          >Thêm món</button>
        </div>
      </div>
      <div className="menu-container__content">
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
      {/* <div className="menu-container__paginition">
        <Pagination
          pagination={paginition1}
          onPageChange={handlePageChange}
        ></Pagination>
      </div> */}
      <CreateForm
        getMenuData={getMenuData}
        visible={isVisibleCreateForm}
        setVisible={setIsVisibleCreateForm}
      ></CreateForm>
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