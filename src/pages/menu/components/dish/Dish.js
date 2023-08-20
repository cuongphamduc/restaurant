import React from 'react'
import './Dish.css'
import avater from './../../../../assets/img/about-4.jpg'

const Dish = ({isEdit, data, onClick, onRemove, onEdit}) => {
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
        <img className="dish-container__avatar" src={data?.hinhanh} alt='dish-avatar'></img>
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
                    <button type='button' onClick={handleRemove} className="dish-container__add bg-danger">Xóa</button>
                  </div>
                }
            </div>

        </div>
    </div>
  )
}

export default Dish