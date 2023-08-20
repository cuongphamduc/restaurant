import './Toasts.css';

import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import iconSuccess from './../../assets/icon/success.png'
import iconWarning from './../../assets/icon/warning.png'
import iconInfo from './../../assets/icon/info.png'
import iconError from './../../assets/icon/error.png'

const Toasts = ({ toastList, setList }) => {
  const deleteToast = useCallback((id) => {
    const toastListItem = toastList.filter((e) => e.id !== id);
    setList(toastListItem);
  }, []);

  const dataToast = {
    success: {
      icon: <img src={iconSuccess}/>,
      background: '#1fb266',
    },
    warning: {
      icon: <img src={iconWarning}/>,
      background: '#f1b627',
    },
    info: {
      icon: <img src={iconInfo}/>,
      background: '#141ed2',
    },
    error: {
      icon: <img src={iconError}/>,
      background: '#eb2d4b',
    },
  };

  // const toastList = [
  //   {
  //     id: 1,
  //     type: "error",
  //     title: "Thành công",
  //     message: "Tạo mới thành công",
  //   }
  // ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, deleteToast]);

  return (
    <div className="toasts-container bottom-right">
      {toastList.map((toast) => {
        return (
          <div key={toast.id} className="notification toast bottom-right">
            <div
              className="logo"
              style={{ color: dataToast[toast.type].background }}
            >
              {dataToast[toast.type].icon}
            </div>
            <div className="info">
              <div className="title">{toast.title}</div>
              <div className="message"> {toast.message}</div>
            </div>
            <div className="button">
              {/* <button onClick={() => deleteToast(toast.id)}>
                <FontAwesomeIcon icon={faXmark} />
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Toasts.prototype = {
  toastList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setList: PropTypes.func.isRequired,
};

export default Toasts;
