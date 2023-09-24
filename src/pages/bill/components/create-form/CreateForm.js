import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './CreateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
// import billApi from '../../../../api/billApi';
import UploadFileField from '../../../../components/form-controls/upload-file-field/UploadFileField';
import Input from '../../../../components/input/Input';

import { faPlus, faSearch, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectCustomer from '../select-customer/SelectCustomer';
import SelectDish from '../select-dish/SelectDish';
import billApi from '../../../../api/BillApi';
import customerApi from '../../../../api/CustomerApi';
import InputSearch from '../../../../components/input-search/InputSearch';
import { event } from 'jquery';
import CreateFormCustomer from '../create-form-customer/CreateForm';
import { useSelector, useDispatch } from 'react-redux'

const CreateForm = (props) => {
    const [isVisibleCreateFormCustomer, setIsVisibleCreateFormCustomer] = useState(false)
    const [isShowAddCustomer, setIsShowAddCustomer] = useState(false)
    // const [nameCustomer, setNameCustomer] = useState(null)
    const [visibleSelectCustomer, setVisibleSelectCustomer] = useState(false)
    const [visibleSelectDish, setVisibleSelectDish] = useState(false)
    const [searchCustomer, setSearchCustomer] = useState(null)
    const [nameCustomer, setNameCustomer] = useState("")
    const [numberCustomer, setNumberCustomer] = useState("")
    const [companyCustomer, setCompanyCustomer] = useState("")
    const [note, setNote] = useState("")
    const [typePay, setTypePay] = useState(0) 
    // const [lishDish, setListDish] = useState([{dish:{
    //     tenmonan: "Ga",
    //     hinhanh: "", 
    //     gia: 100000,
    //     mota: "Ga nuong"
    // }}])
    const [lishDish, setListDish] =useState([])
    const userName = useSelector((state) => state.login.userName)

    const getTotalMoney = () => {
        let total = 0
        lishDish.forEach(dish => {
            total += dish.dish.gia * dish.number
        });

        return total
    }

  const schema = yup.object().shape({
    list_monan: yup.array().required().min(1)
  });

  const form = useForm({
    defaultValues: {
      sdt: '',
      ten: '',
      list_monan: [],
      list_soluong: []
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    let _list_monan = []
    let _list_soluong = []

    lishDish.forEach(dish => {
      _list_monan.push(dish.dish.tenmonan)
      _list_soluong.push(dish.number)
    });

    // console.log(_list_monan, _list_soluong)
    (async () => {
      try {
        const { data } = await billApi.add({
          sdt: numberCustomer,
          ten: nameCustomer,
          list_monan: _list_monan,
          list_soluong: _list_soluong,
          tennguoidung: userName,
          kieuthanhtoan: typePay
        });
        const { data1 } = await billApi.note(
          {
            ghichu: note
          }
        )
      } catch (error) {
        console.log('Failed to fetch bill list: ', error);
      }
    })();
    props.getBillData()
    form.reset()
    setListDish([])
    setNote("")
    props.setVisible(false)
  }

  const handleCancel = () => {
    // document.getElementById("create-form-bill-input-phone-number").value = '';
    // document.getElementById("create-form-bill-input-name").value = '';
    setValuePhoneNumber("")
    setListCustomer([])
    setIsShowAddCustomer(false)
    setIsVisibleCreateFormCustomer(false)
    form.reset()
    setListDish([])
    props.setVisible(false)
  }

  const handleSelectCustomer = (data) => {
    setValuePhoneNumber('')
      setValueCustomerName('')
    form.setValue("sdt", data.sdt)
    form.setValue("ten", data.ten)
  }

    const handleSelectDish = (dataDish) => {
        let newListDish = [...lishDish]
        newListDish.push({
            dish: { ...dataDish },
            number: 1
        })
        form.setValue('list_monan', newListDish)
        setListDish(newListDish)
    }

    const handleAddNumberDish = (index) => {
        let newListDish = [...lishDish]
        newListDish[index].number = Number(newListDish[index].number) + 1
        form.setValue('list_monan', newListDish)
        setListDish(newListDish)
    }

    const handleSubNumberDish = (index) => {
        let newListDish = [...lishDish]
        newListDish[index].number = Number(newListDish[index].number) - 1
        if (newListDish[index].number === 0){
            newListDish.splice(index, 1)
        }
        form.setValue('list_monan', newListDish)
        setListDish(newListDish)
    }

    const handleSetNumberDish = (index, number) => {
      let newListDish = [...lishDish]
      newListDish[index].number = number
      if (newListDish[index].number === 0){
          newListDish.splice(index, 1)
      }
      form.setValue('list_monan', newListDish)
      setListDish(newListDish)
  }

    const [valuePhoneNumber, setValuePhoneNumber] = useState('')
    const [valueCustomerName, setValueCustomerName] = useState('')
    const [listCustomer, setListCustomer] = useState([])
    const handleOnSelectPhoneNumber = (item) => {
      if (item !== null && item !== undefined)
      console.log(item)
      // setValuePhoneNumber(item.sdt)
      setNameCustomer(item.ten)
      setNumberCustomer(item.sdt)
      setCompanyCustomer(item.congty)
      // setValueCustomerName(item.ten)
    }

    const handleChangePhoneNumber = (value) => {
        (async () => {
              try {
                const { data, paginition } = await customerApi.getAll({
                  key: value,
                  lower: "",
                  upper: "",
                  idhoadon: "",
                  page: 1,
                  limit: 0
                });
                setListCustomer(data);
                if (!data || data.length < 1){
                  if (value !== ""){
                    setSearchCustomer(value)
                    setIsShowAddCustomer(true)
                  }
                  else{
                    setIsShowAddCustomer(false)
                  }
                  
                }
              } catch (error) {
                console.log('Failed to fetch customer list: ', error);
              }
            })();
    }

    const handleChangeNameCustomer = (value) => {
      (async () => {
              try {
                const { data, paginition } = await customerApi.getAll({
                  key: value,
                  lower: "",
                  upper: "",
                  idhoadon: "",
                  page: 1,
                  limit: 0
                });
                setListCustomer(data);
              } catch (error) {
                console.log('Failed to fetch customer list: ', error);
              }
            })();
    }

    const handleShorcutCreateBill = (e) => {
      if (window.location.pathname == "/bill"){
        // Neu la nut ESC
        if (e.which == 27){
          if (props.visible){
            if (isVisibleCreateFormCustomer == false){
              handleCancel()
            }
            // let createCustomer = document.getElementById("create-customer-in-bill-button-add-customer")
            // console.log("esc", createCustomer)
            // if (createCustomer == null || createCustomer == undefined){
            //   handleCancel()
            // }
          }
        }
        // Neu la Alt + S
        if (e.altKey && e.which == 83) {
            if (props.visible){
                document.getElementById("button-add-bill").click()
              }
        }
        if (e.altKey && e.which == 65) {
          if (props.visible){
              setVisibleSelectDish(true)
            }
      }
      }
    }
  
    useEffect(() => {
        // document.removeEventListener("keyup", handleShorcutCreateBill)
        // document.addEventListener("keyup", handleShorcutCreateBill)
        var textbox = document.getElementById("create-form-bill-container__name");
        textbox.focus();
    }, [props.visible])

    useEffect(() => {
      if (!isVisibleCreateFormCustomer && !visibleSelectDish){
        var textbox = document.getElementById("create-form-bill-container");
        textbox.focus();
      }
  }, [isVisibleCreateFormCustomer, visibleSelectDish])

    
    const onCreateCustomerDone = () => {
      (async () => {
              try {
                const { data, paginition } = await customerApi.getAll({
                  key: searchCustomer,
                  lower: "",
                  upper: "",
                  idhoadon: "",
                  page: 1,
                  limit: 0
                });
                setListCustomer(data);
              } catch (error) {
                console.log('Failed to fetch customer list: ', error);
              }
            })();
      setIsShowAddCustomer(false)
    }

    const handleChandeRadioButton = (e) => {
      console.log(e.target.value)
      setTypePay(Number(e.target.value))
    }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Modal
          title={`Thêm mới hóa đơn`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-bill-footer'>
              <button
              id="button-add-bill"
                className='button-add'
                type='submit'
              >Thêm</button>
              <button
                className='button-cancel'
                onClick={handleCancel}
              >Hủy</button>
            </div>
          )}
        >
        <div id="create-form-bill-container" className='create-form-bill-container' onKeyDown={handleShorcutCreateBill} tabIndex={"0"}>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Tên/ Số điện thoại:</div>
              <InputSearch id="create-form-bill-container__name" setValue={setValuePhoneNumber} onChange={handleChangePhoneNumber} onSelect={handleOnSelectPhoneNumber} value={valuePhoneNumber} data={listCustomer}></InputSearch>
              <button type='button' className='button-add-customer' onClick={() => {
                setIsVisibleCreateFormCustomer(true)
              }}>Thêm khách hàng</button>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Tên:</div>
              <div className="">{nameCustomer}</div>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Sđt:</div>
              <div className="">{numberCustomer}</div>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Công ty:</div>
              <div className="">{companyCustomer}</div>
            </div>
            <div className="create-form-bill-container__list">
              <div className="create-form-bill-container__header">
                <div className="header__name">Tên món ăn</div>
                <div className="header__price">Giá</div>
                <div className="header__number">Số lượng</div>
              </div>
                {
                    lishDish.map((dish, index) => {
                        return (
                            <div className='list-line'>
                                <div className="list-line__dish">
                                    <div className="list-line__dish__name">{dish.dish.tenmonan}</div>
                                    <div className="list-line__dish__price">{Intl.NumberFormat().format(dish.dish.gia)} VNĐ</div>
                                </div>
                                <div className="list-line__number">
                                    <button type='button' onClick={() => handleSubNumberDish(index)}><FontAwesomeIcon icon={faSubtract} /></button>
                                    <input type='number' className='list-line__number__value' value={dish.number} onChange={(event) => handleSetNumberDish(index, event.target.value)}></input>
                                    <button type='button' onClick={() => handleAddNumberDish(index)}><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {form.formState.errors['list_monan'] && <i>Chưa chọn món ăn</i>}
            <button
                type='button'
                className='button-add'
                onClick={() => {
                  setVisibleSelectDish(true)
                }}
            >Thêm món <FontAwesomeIcon icon={faPlus} /></button>
            <div className="create-form-bill-container__total">
                <div className="total-money">
                    <div className="total-money__label">Tổng tiền:</div>
                    <div className="total-money__value">{Intl.NumberFormat().format(getTotalMoney())} VNĐ</div>
                </div>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Kiểu thanh toán:</div>
              <div className="create-form-bill-container__line__radio">
                <input onChange={handleChandeRadioButton} type="radio" id="huey" name="drone" value="0" defaultChecked />
                <label for="huey">Chuyển khoản</label>
              </div>

              <div className="create-form-bill-container__line__radio">
                <input onChange={handleChandeRadioButton} type="radio" id="dewey" name="drone" value="1" />
                <label for="dewey">Tiền mặt</label>
              </div>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Loại món ăn:</div>
              <input></input>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Ghi chú:</div>
              <textarea value={note} onChange={(e) => {setNote(e.target.value)}}></textarea>
            </div>
            <button type='submit' id="button-submit-form-bill" style={{display: "none"}}></button>
        </div>
        <Modal
          title={`Danh sách khách hàng`}
          visible={visibleSelectCustomer}
          width={"900px"}
          onCancel={() => setVisibleSelectCustomer(false)}
        >
            <SelectCustomer
                onSelect={handleSelectCustomer}
                close={() => setVisibleSelectCustomer(false)}
            ></SelectCustomer>
        </Modal>

          {visibleSelectDish && <SelectDish
              onSelect={handleSelectDish}
              visible={visibleSelectDish}
              setVisible={setVisibleSelectDish}
          ></SelectDish>}
          {isVisibleCreateFormCustomer &&  <CreateFormCustomer
              id="create-customer-in-bill"
              name={valuePhoneNumber}
              getCustomerData={() => {}}
              visible={isVisibleCreateFormCustomer}
              setVisible={setIsVisibleCreateFormCustomer}
              onCreateDone={onCreateCustomerDone}
          ></CreateFormCustomer>}
      </Modal>
    </form>
  )
}

export default CreateForm