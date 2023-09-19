import React, { useState } from 'react'
import './Dish.css'
import avater from './../../../../assets/img/about-4.jpg'
import ConfirmRemove from '../../../../components/confirm-remove/ConfirmRemove'

const Dish = ({isEdit, data, onClick, onRemove, onEdit}) => {
  const [isConfirm, setIsConfirm] = useState(false)

  const handleClick = () => {
    if (onClick){
      onClick()
    }
  }

  const handleEdit = () => {
    onEdit(data)
  }

  const handleRemove = () => {
    onRemove(data)
  }

  return (
    <div className='dish-container' onClick={handleClick}>
        <img className="dish-container__avatar" src={'data:image/png;base64,' + data?.hinhanh} alt='dish-avatar'></img>
        <div className="dish-container__content">
            <div className="dish-container__top">
                <div className="dish-container__name">{data?.tenmonan}</div>
                <div className="dish-container__price">{Intl.NumberFormat().format(data?.gia)} VNĐ</div>
            </div>
            <div className="dish-container__bottom">
                <div className="dish-container__description">{data?.mota}</div>
                {
                  isEdit && <div>
                    <button type='button' onClick={handleEdit} className="dish-container__add bg-success">Sửa</button>
                    <button type='button' onClick={() => setIsConfirm(true)} className="dish-container__add bg-danger">Xóa</button>
                  </div>
                }
            </div>

        </div>
        <ConfirmRemove
          visible={isConfirm}
          setVisible={setIsConfirm}
          onConfirm={handleRemove}
        ></ConfirmRemove>
    </div>
  )
}

export default Dish