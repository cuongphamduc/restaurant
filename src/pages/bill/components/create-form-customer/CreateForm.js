import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/input-field/InputField'
import './CreateForm.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../../../components/modal/Modal';
import customerApi from '../../../../api/CustomerApi';
import UploadFileField from '../../../../components/form-controls/upload-file-field/UploadFileField';
import { DatePicker } from 'antd';
import DropDown from '../../../../components/dropdown/DropDown';

const CreateFormCustomer = (props) => {
  const schema = yup.object().shape({
    ten: yup.string().required('Chưa nhập tên!'),
    sdt: yup.string().required('Chưa nhập số điện thoại!').matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Nhập sai định dạng!"),
    email: yup.string(),
    congty: yup.string()
  },  [['email']]);

  const form = useForm({
    defaultValues: {
      ten: '',
      sdt: '',
      ngaysinh: '',
      diachi: '',
      email: '',
      congty: ''
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    // console.log("event", event)
    // event.preventDefault()
    // event.stopPropagation();
    try {
      let formData = {...values, ...{ngaysinh: birthday, danhxung: sex}}
      const { data } = customerApi.add(formData).then((data) => {
            props.getCustomerData()
            form.reset()
            props.onCreateDone()
            props.setVisible(false)
      })
    } catch (error) {
      console.log('Failed to fetch customer list: ', error);
    }
  }

  const handleCancel = () => {
    form.reset()
    props.setVisible(false)
  }

  const [sex, setSex] = useState('Anh')
  const [birthday, setBirthday] = useState('')
  const onChangeDate = (dayjs, dayString) => {
    setBirthday(dayString)
  }

  const listSex = [
    "Anh",
    "Chị"
  ]

  const onSelectSex = (name, value) => {
    setSex(value)
  }

  const handleShorcutCreateCustomer = (e) => {
    if (window.location.pathname == "/bill"){
      // Neu la nut ESC
      if (e.which == 27){
        if (props.visible){
          handleCancel()
        }
      }
      // Neu la Alt + S
      if (e.altKey && e.which == 83) {
          if (props.visible){
              document.getElementById(props.id ? props.id + "-button-add-customer" : "button-add-customer").click()
          }
      }
    }
  }


  useEffect(() => {
      document.removeEventListener("keyup", handleShorcutCreateCustomer)
      document.addEventListener("keyup", handleShorcutCreateCustomer)
      var textbox = document.getElementById("create-form-customer-container__name");
      textbox.focus();
  }, [props.visible])

  useEffect(() => {
    if (props.name !== null && props.name !== ""){

      const regex = new RegExp("^[0-9]{1,45}$")
      if (regex.test(props.name)){
        form.setValue("sdt", props.name)
      }
      else{
        form.setValue("ten", props.name)
      }
    }
  }, [props.name])

  const handleCreateCustomer = () => {
    form.handleSubmit(() => {
      handleSubmit(form.getValues)
    })();
  }

  return (
    <form>
      <Modal
          title={`Thêm mới khách hàng`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
          footer={(
            <div className='create-form-customer-footer'>
              <button
                id={props.id ? props.id + "-button-add-customer" : "button-add-customer"}
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
        <div className='create-form-customer-container' id={props.id ? props.id : ""}>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Tên khách hàng:</div>
              <InputField id="create-form-customer-container__name" name="ten" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Số điện thoại:</div>
              <InputField name="sdt" form={form} type="text"></InputField>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Danh xưng:</div>
              <DropDown name={"name-dish"} selected={sex} listItem={listSex} onSelected={onSelectSex}></DropDown>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Ngày sinh:</div>
              <DatePicker placeholder="Chọn ngày" onChange={onChangeDate}/>
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
            <button type='submit' id="create-submit-form-customer" style={{display: "none"}}></button>
        </div>
      </Modal>
    </form>
  )
}

export default CreateFormCustomer