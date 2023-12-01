import React, { Component } from 'react';
import axios from 'axios';
import css from './App.module.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imagegallery/ImageGallery';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';

const API_KEY = '38505453-c52f6e8f101e639f790909cc4';
const PER_PAGE = 12;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      isLoading: false,
      page: 1,
      searchQuery: '',
      selectedImage: null,
      totalImagesCount: 0,
      displayedImagesCount: 0,
      isModalOpen: false,
    };
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}&min_width=640&min_height=480`
      );

      const newImages = response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
      const uniqueNewImages = newImages.filter(
        newImage =>
          !this.state.images.some(
            existingImage => existingImage.id === newImage.id
          )
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...uniqueNewImages],
        totalImagesCount: response.data.totalHits,
        displayedImagesCount:
          prevState.displayedImagesCount + uniqueNewImages.length,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      images: [],
      searchQuery: query,
      page: 1,
      totalImagesCount: 0,
      displayedImagesCount: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  componentDidMount() {
    if (this.state.images.length !== 0) {
      this.fetchImages();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isModalOpen, selectedImage, isLoading } = this.state;

    return (
      <div className={css.App}>
        <SearchBar handleSearch={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        <Button onClick={this.handleLoadMore} />
        {this.state.selectedImage && (
          <Modal
            isOpen={isModalOpen}
            imageUrl={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
