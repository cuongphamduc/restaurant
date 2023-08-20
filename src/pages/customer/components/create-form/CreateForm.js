import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './CreateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
import customerApi from '../../../../api/CustomerApi';
import UploadFileField from '../../../../components/form-controls/upload-file-field/UploadFileField';

const CreateForm = (props) => {
  const schema = yup.object().shape({
    ten: yup.string().required('Chưa nhập tên!'),
    sdt: yup.string().required('Chưa nhập số điện thoại!').matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Nhập sai định dạng!"),
    email: yup.string().matches(/^\S+@\S+\.\S+$/, "Nhập sai định dạng!")
  });

  const form = useForm({
    defaultValues: {
      ten: '',
      sdt: '',
      ngaysinh: '',
      diachi: '',
      email: ''
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    (async () => {
      try {
        let formData = {...values, ...{old_sdt: ""}}
        console.log(formData)
        const { data } = await customerApi.add(formData);
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

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Modal
          title={`Thêm mới món ăn`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-customer-footer'>
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
              <InputField name="ngaysinh" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Địa chỉ:</div>
              <InputField name="diachi" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Email:</div>
              <InputField name="email" form={form} type="text"></InputField>
            </div>
            <button type='submit' id="button-submit-form-customer" style={{display: "none"}}></button>
        </div>
      </Modal>
    </form>
  )
}

export default CreateForm