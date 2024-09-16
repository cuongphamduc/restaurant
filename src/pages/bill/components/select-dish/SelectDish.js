import React, { useEffect, useState } from 'react'
import Dish from '../../../menu/components/dish/Dish'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SelectDish.css'
import menuApi from './../../../../api/MenuApi'
import Modal from '../../../../components/modal/Modal';
import CreateFormMenu from '../create-form-menu/CreateForm';
import DropDown from '../../../../components/dropdown/DropDown';

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

const SelectDish = ({onSelect, visible, setVisible}) => {
    const [isVisibleCreateFormDish, setIsVisibleCreateFormDish] = useState(false)
    const [isShowAddDish, setIsShowAddDish] = useState(false)
    const [search, setSearch] = useState("")
    const [menuList, setMenuList] = useState([])

    // console.log("select dish render")

    const getMenuData = () => {
        (async () => {
          try {
            let _typeDish = 0
            if (typeDish == "Đồ ăn"){
              _typeDish = 0
            }
            if (typeDish == "Đồ ăn kèm"){
              _typeDish = 1
            }
            if (typeDish == "Đồ uống"){
              _typeDish = 2
            }
            if (typeDish == "Tất cả"){
              _typeDish = 10
            }
            const { data } = await menuApi.getAll({
              key: search,
              lower: "",
              upper: "",
              idhoadon: "",
              nhommonan: _typeDish,
              page: 1,
              limit: 0
            });
            setMenuList(data);
            if (!data || data.length < 1){
                if (search !== ""){
                  setIsShowAddDish(true)
                }
                else{
                    setIsShowAddDish(false)
                }
                
            }
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
    }, [search])

    const handleSelect = (dataDish) => {
        onSelect(dataDish)
        setVisible(false)
    }

    const handleShorcutSelectDish = (e) => {
        if (window.location.pathname == "/bill"){
          // Neu la nut ESC
          if (e.which == 27){
            setVisible(false)
          }
        }
    }

    useEffect(() => {
        var textbox = document.getElementById("select-dish-container__search");
        textbox.focus();
    }, [visible])

    useEffect(() => {
        if (!isVisibleCreateFormDish){
          var textbox = document.getElementById("select-dish-container__search");
          textbox.focus();
        }
    }, [isVisibleCreateFormDish])

    const onCreateDishDone = () => {

    }

    const listDish = [
      "Tất cả",
      "Đồ ăn",
      "Đồ ăn kèm",
      "Đồ uống"
    ]
  
    const [typeDish, setTypeDish] = useState("Đồ ăn")
  
    const onSelectDish = (name, value) => {
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
  
          const { data, paginition } = await menuApi.getAll({
            key: search,
            lower: "",
            upper: "",
            idhoadon: "",
            nhommonan: _typeDish,
            page: 1,
            limit: 0
          });
          setMenuList(data);
          // setMenuPaginition({
          //   page: paginition.page,
          //   limit: paginition.limit,
          //   totalPage: paginition.total_pages,
          //   totalItem: paginition.total_records
          // })
        } catch (error) {
          console.log('Failed to fetch menu list: ', error);
        }
      })();
    }

    return (
        <Modal
          title={`Danh sách món ăn`}
          visible={visible}
          width={"900px"}
          onCancel={() => setVisible(false)}
        >
            <div id="select-dish-container" className='select-dish-container' onKeyDown={handleShorcutSelectDish} tabIndex={"0"}>
                <div className="select-dish-container__search">
                  <DropDown headerClassName="menu-container-filter" selected={typeDish} listItem={listDish} onSelected={onSelectDish}></DropDown>
                    <input id="select-dish-container__search" onChange={onChangeSearch}></input>
                    {/* <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button> */}
                    <button type='button' className='button-add-customer' onClick={() => {
                        setIsVisibleCreateFormDish(true)
                    }}>Thêm món ăn</button>
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
            {isVisibleCreateFormDish &&  <CreateFormMenu
              id="create-customer-in-bill"
              name={search}
              getMenuData={() => {}}
              visible={isVisibleCreateFormDish}
              setVisible={setIsVisibleCreateFormDish}
              onCreateDone={onCreateDishDone}
          ></CreateFormMenu>}
        </Modal>
    )
}

export default SelectDish