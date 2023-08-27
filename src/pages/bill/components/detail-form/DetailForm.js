import React from 'react'
import Modal from '../../../../components/modal/Modal'
import './DetailForm.css'
import Table from '../../../../components/table/Table'

const columns = [
    {
      title: 'Tên món ăn',
      dataIndex: 'idhoadon',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '40%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'ten',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '20%',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'sdt',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '20%',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'tong',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '20%',
    }
]

const DetailForm = (props) => {
    const handleCancel = () => {
        props.setVisible(false)
    }

    return (
        <Modal
            title={`Chi tiết hóa đơn`}
            visible={props.visible}
            width={"900px"}
            onCancel={handleCancel}
        >
            <div className='detail-form-container'>
                <div className="detail-form-container__customer">
                    <div className="customer-lable">
                        Khách hàng
                    </div>
                    <div className="customer-content">
                        <div className="customer-line">
                            <div className="customer-line__label">Tên:</div>
                            <div className="customer-line__content">{props.data.ten}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Số điện thoại:</div>
                            <div className="customer-line__content">{props.data.sdt}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Ngày sinh:</div>
                            <div className="customer-line__content">{props.data.ngaysinh}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Địa chỉ:</div>
                            <div className="customer-line__content">{props.data.diachi}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Email:</div>
                            <div className="customer-line__content">{props.data.email}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Công ty:</div>
                            <div className="customer-line__content">{props.data.congty}</div>
                        </div>
                    </div>
                </div>
                <div className="detail-form-container__list-dish">
                    <div className="dish-lable">
                        Món ăn
                    </div>
                    <Table columns={columns}></Table>
                </div>
                <div className="detail-form-container__total">
                    <div className="total-lable">
                        Tổng tiền:
                    </div>
                    <div className="total-content">
                        100.000 VNĐ
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DetailForm