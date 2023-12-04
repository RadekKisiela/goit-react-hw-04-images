import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './App.module.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imagegallery/ImageGallery';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';

const API_KEY = '38505453-c52f6e8f101e639f790909cc4';
const PER_PAGE = 12;

const fetchImages = async (
  searchQuery,
  page,
  setImages,
  setTotalImagesCount,
  setDisplayedImagesCount,
  setIsLoading
) => {
  setIsLoading(true);

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}&min_width=640&min_height=480`
    );

    const newImages = response.data.hits.map(image => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    }));

    setImages(prevImages => [...prevImages, ...newImages]);
    setTotalImagesCount(response.data.totalHits);
    setDisplayedImagesCount(prevCount => prevCount + newImages.length);
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
};

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImagesCount, setTotalImagesCount] = useState(0);
  const [displayedImagesCount, setDisplayedImagesCount] = useState(0);

  const handleSearchSubmit = query => {
    setImages([]);
    setSearchQuery(query);
    setPage(1);
    setTotalImagesCount(0);
    setDisplayedImagesCount(0);
  };

  const handleLoadMore = () => {
    fetchImages(
      searchQuery,
      setImages,
      setTotalImagesCount,
      setDisplayedImagesCount,
      setIsLoading
    );
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages(
      searchQuery,
      page,
      setImages,
      setTotalImagesCount,
      setDisplayedImagesCount,
      setIsLoading
    );
  }, [searchQuery, page]);

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.App}>
      <SearchBar handleSearch={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {displayedImagesCount < totalImagesCount && (
        <Button onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <Modal
          isOpen={selectedImage !== null}
          imageUrl={selectedImage}
          onClose={handleCloseModal}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
