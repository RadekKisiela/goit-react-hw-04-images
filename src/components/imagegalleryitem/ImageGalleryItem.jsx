import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { image, onClick } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={image.webformatURL}
          alt=""
          className={css.ImageGalleryItemImage}
          onClick={() => onClick(image.largeImageURL)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
