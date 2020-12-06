import { useState } from 'react';

import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar.js';

import TopTracks from '../components/TopTracks.js';

export default function AddPage({setMode, OneList}) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState("track");
  const currentOneList = {...OneList}; 

  const addSong = (newSong) => {
    if (currentOneList.playlist === undefined) {
      currentOneList.playlist = [newSong];
      alert(`${newSong.title} is now added to your OneList!`);
    } else {
      const matchArray = currentOneList.playlist.filter((songD) => {return songD.title === newSong.title ;});
      if (matchArray.length === 0){
        currentOneList.playlist.push(newSong);
        alert(`${newSong.title} is now added to your OneList!`);
      } else {
        alert(`${newSong.title} has already been added to your OneList!`);
      }
    }
  };

  return (
    <>
        <h1 className="title">Search Spotify: </h1>
        <SearchBar searchTerm = {searchTerm} sortType = {sortType} setTerm = {setSearchTerm} setType = {setSortType}/>
        <TopTracks searchTerm = {searchTerm} addSong = {addSong} sortType={sortType}/>
        <div>
          <button className = "backButton" onClick = {()=>setMode(currentOneList)}>Back</button>
        </div>
    </>
  );
}

AddPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.object
}

//<SongResults songs={songs} searchTerm={searchTerm} sortType={sortType} addSong = {addSong}/>