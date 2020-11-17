import React from 'react';

import SearchSongDetail from './SearchSongDetail';

import PropTypes from 'prop-types';

export default function SongResults ({songs, searchTerm, sortType, addSong, user}) {
  let displayedSongs = songs; 

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    displayedSongs = displayedSongs.filter((song) => {
      const title = song.title.toLowerCase();
      const artist = song.artist.toString().toLowerCase();

      if (sortType ==='artist') {
        return artist.includes(term);
      }
      return title.includes(term);
    });
  }

  if (sortType) {
    displayedSongs = displayedSongs.sort((s1, s2) => {
      if (s1[sortType] < s2[sortType]) {
        return -1;
      } else if (s1[sortType] === s2[sortType]) {
        return 0;
      }
      return 1;
    });
  }
  
  
  
  let songList = displayedSongs.map((song) => {
    return (
    <SearchSongDetail key = {song.id} details = {song} addSong = {addSong} user = {user} />
  )});

  if (searchTerm===undefined || searchTerm==="") {
    songList = '';
  }
  
  else if (songList.length === 0){
    songList = "No Results Found";
  }

  return <div> {songList}</div>
}


SongResults.propTypes = {
  songs: PropTypes.array.isRequired,
  searchTerm: PropTypes.string,
  addSong: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  user: PropTypes.string,
};
