import React from 'react'
import './Dish.css'
import avater from './../../../../assets/img/about-4.jpg'

const Dish = ({data, onClick}) => {
  const handleClick = () => {
    if (onClick){
      onClick()
    }
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
                <button className="dish-container__add bg-danger">Thêm</button>
            </div>

        </div>
    </div>
  )
}

export default Dish