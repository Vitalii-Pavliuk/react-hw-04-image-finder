import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, onImageClick }) {
  const { webformatURL, tags } = image;

  const handleClick = () => {
    onImageClick(image);
  };

    return (
      <li className={styles.GalleryItem} onClick={handleClick}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.GalleryItemImage}
        />
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;