import React, { useEffect, useState } from 'react'
import Modal from '../../../../components/modal/Modal'
import './DetailForm.css'
import Table from '../../../../components/table/Table'
import billApi from './../../../../api/BillApi'

const columns = [
    {
      title: 'Tên món ăn',
      dataIndex: 'tenmonan',
      render: (text, data) => {
        return (
          <span>
            {text}
          </span>
        );
      },
      width: '30%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'soluong',
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
      dataIndex: 'gia',
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
    const [customerInfo, setCustomerInfo] = useState('')
    const [dishInfo, setDishInfo] = useState([])

    const handleCancel = () => {
        props.setVisible(false)
    }

    useEffect(() => {
        (async () => {
      try {
        const { customer, dish } = await billApi.getDetail(props.data.idhoadon);
        setCustomerInfo(customer)
        setDishInfo(dish)
      } catch (error) {
        console.log('Failed to fetch customer list: ', error);
      }
    })();
    }, [props.data])

    const getTotalMoney = () => {
        let total = 0
        dishInfo.forEach(dish => {
            total += dish.tong
        });

        return total
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
                            <div className="customer-line__content">{customerInfo.ten}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Số điện thoại:</div>
                            <div className="customer-line__content">{customerInfo.sdt}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Ngày sinh:</div>
                            <div className="customer-line__content">{customerInfo.ngaysinh}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Địa chỉ:</div>
                            <div className="customer-line__content">{customerInfo.diachi}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Email:</div>
                            <div className="customer-line__content">{customerInfo.email}</div>
                        </div>
                        <div className="customer-line">
                            <div className="customer-line__label">Công ty:</div>
                            <div className="customer-line__content">{customerInfo.congty}</div>
                        </div>
                    </div>
                </div>
                <div className="detail-form-container__list-dish">
                    <div className="dish-lable">
                        Món ăn
                    </div>
                    <Table columns={columns} dataSource={dishInfo}></Table>
                </div>
                <div className="detail-form-container__total">
                    <div className="total-lable">
                        
                    </div>
                    <div className="total-content">
                        Tổng tiền: {Intl.NumberFormat().format(getTotalMoney())} VNĐ
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DetailForm