import React, { useEffect, useState } from 'react'
import Modal from '../../../../components/modal/Modal'
import './DetailForm.css'
import Table from '../../../../components/table/Table'
import billApi from './../../../../api/BillApi'
import { Button } from 'antd'

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
            {Intl.NumberFormat().format(text)}
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
            {Intl.NumberFormat().format(text)}
          </span>
        );
      },
      width: '20%',
    }
]

const DetailForm = (props) => {
    const [customerInfo, setCustomerInfo] = useState('')
    const [dishInfo, setDishInfo] = useState([])
    const [billInfo, setBillInfo] = useState([])

    const handleCancel = () => {
        props.setVisible(false)
    }

    useEffect(() => {
        (async () => {
      try {
        const { customer, dish, bill } = await billApi.getDetail(props.data.idhoadon);
        setCustomerInfo(customer)
        setDishInfo(dish)
        setBillInfo(bill)
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

    const handlePrint = () => {
      try {
        const { data } = billApi.note({
          idhoadon: props.data.idhoadon,
          ten: customerInfo.ten,
          diachi: customerInfo.diachi,
          suatan: billInfo.suatan,
          loaihopcom: billInfo.loaihopcom,
          ghichu: billInfo.ghichu
        });
        // const { data1 } = await billApi.note(
        //   {
        //     ghichu: note
        //   }
        // )
      } catch (error) {
        console.log('Failed to print note: ', error);
      }
    }

    const handlePrintBill = () => {
      try {
        const { data } = billApi.bill({
          idhoadon: props.data.idhoadon,
        });
      } catch (error) {
        console.log('Failed to print bill: ', error);
      }
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
                        <div className="customer-line">
                            <div className="customer-line__label">Kiểu thanh toán:</div>
                            <div className="customer-line__content">{customerInfo?.loaithanhtoan == 0 ? "Thu tiền ngay" : "Công nợ" }</div>
                        </div>
                    </div>
                </div>
              <div className="detail-form-container__customer">
                <div className="customer-lable">
                    Hóa đơn
                </div>
                <div className="customer-content">
                  <div className="customer-line">
                      <div className="customer-line__label">Thời gian:</div>
                      <div className="customer-line__content">{billInfo.thoigian}</div>
                  </div>
                  <div className="customer-line">
                      <div className="customer-line__label">Phương thức thanh toán:</div>
                      <div className="customer-line__content">{billInfo?.kieuthanhtoan == 0 ? "Chuyển khoản" : "Tiền mặt" }</div>
                  </div>
                  <div className="customer-line">
                      <div className="customer-line__label">Loại suất ăn:</div>
                      <div className="customer-line__content">{billInfo.suatan}</div>
                  </div>
                  <div className="customer-line">
                      <div className="customer-line__label">Loại hộp cơm:</div>
                      <div className="customer-line__content">{billInfo?.loaihopcom == 0 ? "Khay inox" : "Hộp nhựa"}</div>
                  </div>
                  <div className="customer-line">
                      <div className="customer-line__label">Ghi chú:</div>
                      <div className="customer-line__content">
                          {billInfo.ghichu && String(billInfo.ghichu).split(`\n`).map((item) => {
                            return (
                              <p>{item}</p>
                            )
                          }
                          )}
                      </div>
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
                <div className="detail-form-container__total">
                    <div className="total-lable">
                        
                    </div>
                    <button className='button-print-bill' onClick={handlePrintBill}>In hoá đơn</button>
                    <button className='button-print' onClick={handlePrint}>In ghi chú</button>
                </div>
            </div>
        </Modal>
    )
}

export default DetailForm