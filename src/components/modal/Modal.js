import './Modal.scss';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const Modal = (props) => {
  let { title, visible, width, footer, onCancel, children, className } = props;

  return (
    <div
      className={`modal-container ${visible ? '' : 'modal-container--hidden'}`}
    >
      <div className="modal-container__overlay" onClick={onCancel}></div>
      <div
        className={`modal-container__popup ${className ? className : ''}`}
        style={{ width: width }}
      >
        <div className="modal-container__header">
          <div className="modal-container__title">{title}</div>
          <div className="modal-container__close" onClick={onCancel}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className="modal-container__content ecm-base__scroll">
          {children}
        </div>
        {footer && <div className="modal-container__footer">{footer}</div>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  width: PropTypes.any,
  onCancel: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  footer: PropTypes.any,
};

export default Modal;
