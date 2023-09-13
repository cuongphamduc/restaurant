import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './CreateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
import menuApi from '../../../../api/MenuApi';
import UploadFileField from '../../../../components/form-controls/upload-file-field/UploadFileField';
import DropDown from '../../../../components/dropdown/DropDown';

const CreateForm = (props) => {
  const schema = yup.object().shape({
    tenmonan: yup.string().required('Chưa nhập tên món ăn!'),
    gia: yup.number("Giá phải là số!").integer().min(1, "Giá phải lớn hơn 0!").required('Chưa nhập giá!'),
    hinhanh: yup.string(),
    mota: yup.string(),
  });

  const form = useForm({
    defaultValues: {
      tenmonan: '',
      mota: '',
      gia: 1,
      hinhanh: ''
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    (async () => {
      try {
        let imagefile = document.getElementById("create-menu-upload-file")
        console.log(imagefile)
        const { data } = await menuApi.add(values, imagefile.files[0]);
      } catch (error) {
        console.log('Failed to fetch menu list: ', error);
      }
    })();
    props.getMenuData()
    form.reset()
    props.setVisible(false)
  }

  const handleCancel = () => {
    form.reset()
    props.setVisible(false)
  }

  const listDish = [
    "Đồ ăn",
    "Đồ ăn kèm",
    "Đồ uống"
  ]

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Modal
          title={`Thêm mới món ăn`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-menu-footer'>
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
        <div className='create-form-menu-container'>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Tên:</div>
              <InputField name="tenmonan" form={form} type="text"></InputField>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Mô tả:</div>
              <InputField name="mota" form={form} type="text"></InputField>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Nhóm món ăn:</div>
              <DropDown listItem={listDish}></DropDown>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Giá(VNĐ):</div>
              <InputField name="gia" form={form} type="number"></InputField>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Ảnh:</div>
              <UploadFileField id="create-menu-upload-file" name="hinhanh" form={form} type="file"></UploadFileField>
            </div>
            <button type='submit' id="button-submit-form-menu" style={{display: "none"}}></button>
        </div>
      </Modal>
    </form>
  )
}

export default CreateForm