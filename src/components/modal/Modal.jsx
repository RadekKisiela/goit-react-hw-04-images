import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };
  render() {
    const { isOpen, imageUrl, onClose } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={css.Overlay} onClick={onClose}>
        <div className={css.Modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
