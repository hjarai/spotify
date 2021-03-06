/*
  SearchBar.js

  Component within AddPage that tracks what users input as a search term and whether they 
  are searching by track title or by artist. 
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/searchBar.module.css';

function SearchBar({
  searchTerm,
  sortType,
  setTerm,
  setType,
}) {
  const searchField = (
    <input
      aria-label="title"
      type="text"
      placeholder="Search songs"
      value={searchTerm}
      onChange={(event) => {
        setTerm(event.target.value);
      }}
    />
  );

  const sortTool = (
    <select
      aria-label = "dropdown"
      className={styles.select}
      value={sortType}
      onChange={(event) => {
        setType(event.target.value);
      }}
    >
      <option value="track">Track</option>
      <option value="artist">Artist</option>
    </select>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>OneList</h1>
      <div className={styles.contents}>
        {searchField}
      </div>
      <div className={styles.contents}>
        Search by {sortTool}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  sortType: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default SearchBar;
