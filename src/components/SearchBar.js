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
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(event) => {
        setTerm(event.target.value);
      }}
    />
  );

  const sortTool = (
    <select
      className={styles.select}
      value={sortType}
      onChange={(event) => {
        setType(event.target.value);
      }}
    >
      <option value="title">Title</option>
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
/*
searchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  ascending: PropTypes.bool.isRequired,
  setTerm: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
};
*/
export default SearchBar;
