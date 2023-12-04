import React from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchInput.value;
    handleSearch(searchQuery);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="searchInput"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
