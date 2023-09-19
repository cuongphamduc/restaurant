import React from 'react'
import Modal from '../modal/Modal'
import './ConfirmRemove.scss';

const ConfirmRemove = ({visible, setVisible, onConfirm, code}) => {
    const handleCancel = () => {
        setVisible(false)
    }

    const handleConfirm = () => {
        if (code !== null || code !== undefined){
            onConfirm(code)
        }
        else{
            onConfirm()
        }
        setVisible(false)
    }

    return (
        <Modal
            title={`Bạn có chắc chắn muốn xóa?`}
            visible={visible}
            width={"900px"}
            className={"confirm-remove__container"}
            onCancel={handleCancel}
        >
            <div className='confirm-remove'>
                <button className='confirm__button-remove' onClick={handleConfirm}>Xóa</button>
                <button className='confirm__button-cancel' onClick={handleCancel}>Hủy</button>
            </div>
        </Modal>
    )
}

export default ConfirmRemove