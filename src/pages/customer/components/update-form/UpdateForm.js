import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './UpdateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
import customerApi from '../../../../api/CustomerApi';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const UpdateForm = (props) => {
  const schema = yup.object().shape({
    ten: yup.string().required('Chưa nhập tên!'),
    sdt: yup.string().required('Chưa nhập số điện thoại!').matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Nhập sai định dạng!"),
    email: yup.string()
      
  });

  const form = useForm({
    defaultValues: {
      ten: props.data.ten,
      sdt: props.data.sdt,
      diachi: props.data.diachi,
      email: props.data.email,
      congty: props.data.congty
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    (async () => {
      try {
        let formData = {...values, ...{old_sdt: props.data.sdt, ngaysinh: birthday}}
        console.log(formData)
        const { data } = await customerApi.update(formData);
      } catch (error) {
        console.log('Failed to fetch customer list: ', error);
      }
    })();
    props.getCustomerData()
    form.reset()
    props.setVisible(false)
  }

  const handleCancel = () => {
    form.reset()
    props.setVisible(false)
  }

  const [birthday, setBirthday] = useState('2000-10-10')
  const onChangeDate = (dayjs, dayString) => {
    console.log(dayString)
    setBirthday(dayString)
  }

  useEffect(() => {
    console.log(props.data.ngaysinh)
    form.setValue('ten', props.data.ten)
    form.setValue('sdt', props.data.sdt)
    form.setValue('diachi', props.data.diachi)
    form.setValue('email', props.data.email)
    form.setValue('congty', props.data.congty)
    setBirthday(props.data.ngaysinh)
  }, [props.data])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Modal
          title={`Cập nhật thông tin khách hàng`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-customer-footer'>
              <button
                className='button-add'
                type='submit'
              >Cập nhật</button>
              <button
                className='button-cancel'
                onClick={handleCancel}
              >Hủy</button>
            </div>
          )}
        >
        <div className='create-form-customer-container'>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Tên khách hàng:</div>
              <InputField name="ten" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Số điện thoại:</div>
              <InputField name="sdt" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Ngày sinh:</div>
              {birthday != "" ? <DatePicker value={dayjs(birthday, 'YYYY-MM-DD')} placeholder="Chọn ngày" onChange={onChangeDate}/> : <DatePicker placeholder="Chọn ngày" onChange={onChangeDate}/>}
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Địa chỉ:</div>
              <InputField name="diachi" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Email:</div>
              <InputField name="email" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Công ty:</div>
              <InputField name="congty" form={form} type="text"></InputField>
            </div>
            <button type='submit' id="button-submit-form-customer" style={{display: "none"}}></button>
        </div>
      </Modal>
    </form>
  )
}

export default UpdateForm