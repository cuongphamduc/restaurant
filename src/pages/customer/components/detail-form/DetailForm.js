import React, { useEffect, useState } from 'react'
import './DetailForm.css'
import Modal from '../../../../components/modal/Modal';

const DetailForm = (props) => {
    const handleCancel = () => {
        props.setVisible(false)
      }

  return (
      <Modal
          title={`Thông tin chi tiết khách hàng`}
          visible={props.visible}
          width={"900px"}
          onCancel={handleCancel}
        >
        <div className='create-form-customer-container'>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Tên khách hàng:</div>
              <div className="">{props.data.ten}</div>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Số điện thoại:</div>
              <div className="">{props.data.sdt}</div>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Ngày sinh:</div>
              <div className="">{props.data.ngaysinh}</div>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Địa chỉ:</div>
              <div className="">{props.data.diachi}</div>
            </div>
            <div className="create-form-customer-container__line">
              <div className="create-form-customer-container__line__lable">Email:</div>
              <div className="">{props.data.email}</div>
            </div>
            <button type='submit' id="button-submit-form-customer" style={{display: "none"}}></button>
        </div>
      </Modal>
  )
}

export default DetailForm