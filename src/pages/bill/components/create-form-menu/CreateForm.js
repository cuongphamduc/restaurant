import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './CreateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
import menuApi from '../../../../api/MenuApi';
import UploadFileField from '../../../../components/form-controls/upload-file-field/UploadFileField';
import DropDown from '../../../../components/dropdown/DropDown';
import { useDispatch } from 'react-redux';

const CreateFormMenu = (props) => {
  const schema = yup.object().shape({
    tenmonan: yup.string().required('Chưa nhập tên món ăn!'),
    gia: yup.number("Giá phải là số!").integer().min(1, "Giá phải lớn hơn 0!").required('Chưa nhập giá!'),
    hinhanh: yup.string(),
    mota: yup.string(),
  });
  const [typeDish, setTypeDish] = useState("Đồ ăn")

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

        let formData = {...values, ...{nhommonan: _typeDish}}
        const { data } = await menuApi.add(formData, imagefile.files[0]);
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

  const onSelectDish = (name, value) => {
    setTypeDish(value)
  }

  const dispatch = useDispatch()

  const handleShorcutCreateMenu = (e) => {
    if (window.location.pathname == "/bill"){
      // Neu la nut ESC
      if (e.which == 27){
        handleCancel()
      }
      // Neu la Alt + 9
      if (e.altKey && e.which == 57) {
          if (props.visible){
              document.getElementById("button-add-dish").click()
          }
      }
    }
  }

  useEffect(() => {
      // document.removeEventListener("keyup", handleShorcutCreateMenu)
      // document.addEventListener("keyup", handleShorcutCreateMenu)
      var textbox = document.getElementById("create-form-menu-container__name");
      textbox.focus();
  }, [props.visible])

  useEffect(() => {
    if (props.name !== null && props.name !== ""){
      form.setValue("tenmonan", props.name)
    }
  }, [props.name])

  const handleCreateDish = () => {
    form.handleSubmit(() => {
      handleSubmit(form.getValues)
    })();
  }

  return (
    <form>
      <Modal
          title={`Thêm mới món ăn`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-menu-footer'>
              <button
                id="button-add-dish"
                className='button-add'
                type='button'
                onClick={form.handleSubmit((values) => {
                  handleSubmit(values)
                })}
              >Thêm</button>
              <button
                className='button-cancel'
                onClick={handleCancel}
              >Hủy</button>
            </div>
          )}
        >
        <div id="create-form-menu-container" className='create-form-menu-container' onKeyDown={handleShorcutCreateMenu} tabIndex={"0"}>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Tên:</div>
              <InputField id="create-form-menu-container__name" name="tenmonan" form={form} type="text"></InputField>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Mô tả:</div>
              <InputField name="mota" form={form} type="text"></InputField>
            </div>
            <div className="create-form-menu-container__line">
              <div className="create-form-menu-container__line__lable">Nhóm món ăn:</div>
              <DropDown name={"name-dish"} selected={typeDish} listItem={listDish} onSelected={onSelectDish}></DropDown>
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

export default CreateFormMenu