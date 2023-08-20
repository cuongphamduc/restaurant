import React, { useState } from 'react'
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

const CreateForm = (props) => {
    const [visibleSelectCustomer, setVisibleSelectCustomer] = useState(false)
    const [visibleSelectDish, setVisibleSelectDish] = useState(false)
    const [lishDish, setListDish] = useState([])

    const getTotalMoney = () => {
        let total = 0
        lishDish.forEach(dish => {
            total += dish.dish.gia * dish.number
        });

        return total
    }

  const schema = yup.object().shape({
    sdt: yup.string().required('Chưa nhập số điện thoại!'),
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
          sdt: values.sdt,
          list_monan: _list_monan,
          list_soluong: _list_soluong,
          tennguoidung: "admin"
        });
      } catch (error) {
        console.log('Failed to fetch bill list: ', error);
      }
    })();
    props.getBillData()
    form.reset()
    props.setVisible(false)
  }

  const handleCancel = () => {
    document.getElementById("create-form-bill-input-phone-number").value = '';
    document.getElementById("create-form-bill-input-name").value = '';
    form.reset()
    setListDish([])
    props.setVisible(false)
  }

  const handleSelectCustomer = (data) => {
    document.getElementById("create-form-bill-input-phone-number").value = data.sdt;
    document.getElementById("create-form-bill-input-name").value = data.ten;
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
        newListDish[index].number += 1
        form.setValue('list_monan', newListDish)
        setListDish(newListDish)
    }

    const handleSubNumberDish = (index) => {
        let newListDish = [...lishDish]
        newListDish[index].number -= 1
        if (newListDish[index].number === 0){
            newListDish.splice(index, 1)
        }
        form.setValue('list_monan', newListDish)
        setListDish(newListDish)
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
        <div className='create-form-bill-container'>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Số điện thoại:</div>
              <InputField id="create-form-bill-input-phone-number" name="sdt" form={form} type="text"></InputField>
              <button
                type='button'
                className='button-search'
                onClick={() => setVisibleSelectCustomer(true)}
            ><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div className="create-form-bill-container__line">
              <div className="create-form-bill-container__line__lable">Tên khách hàng:</div>
              <InputField id="create-form-bill-input-name" name="ten" form={form} type="text"></InputField>
            </div>
            <div className="create-form-bill-container__list">
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
                                    <div className='list-line__number__value'>{dish.number}</div>
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
                onClick={() => setVisibleSelectDish(true)}
            >Thêm món <FontAwesomeIcon icon={faPlus} /></button>
            <div className="create-form-bill-container__total">
                <div className="total-money">
                    <div className="total-money__label">Tổng tiền:</div>
                    <div className="total-money__value">{Intl.NumberFormat().format(getTotalMoney())} VNĐ</div>
                </div>
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
        <Modal
          title={`Danh sách món ăn`}
          visible={visibleSelectDish}
          width={"900px"}
          onCancel={() => setVisibleSelectDish(false)}
        >
            <SelectDish
                onSelect={handleSelectDish}
                close={() => setVisibleSelectDish(false)}
            ></SelectDish>
        </Modal>
      </Modal>
    </form>
  )
}

export default CreateForm