import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchImagesByValue } from '../../servises/pixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import styles from './ImageGallery.module.css';
import { Button } from 'components/Button';

function ImageGallery({ searchValue }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setError(null);
    setShowModal(false);
    setModalImage(null);
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const newImages = await fetchImagesByValue(searchValue, page);
        setImages(prev => [...prev, ...newImages]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchValue, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (image) => {
    setShowModal(true);
    setModalImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={openModal}
          />
        ))}
      </ul>

      {loading && <Loader />}

      {!loading && images.length > 0 && (
        <Button type="button" onClick={handleLoadMore}>
          Load More
        </Button>
      )}

      {showModal && (
        <Modal image={modalImage} onClose={closeModal} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default ImageGallery;
