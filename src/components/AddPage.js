import { useState } from 'react';

import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar.js';

import data from '../../data/songs.json';

import SongResults from '../components/SongResults.js';

export default function AddPage({setMode, OneList}) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [songs] = useState(data);
  const currentOneList = {...OneList}; 

  const addSong = (newSong) => {
    if (currentOneList.playlist === undefined) {
      currentOneList.playlist = [newSong];
    } else {
      const matchArray = currentOneList.playlist.filter((songD) => {return songD.title === newSong.title ;});
      if (matchArray.length === 0){
        currentOneList.playlist.push(newSong);
      }
    }
  };
  /*
  const deleteSong = (deletedSong) => {
    const newQueue = queue.filter((song)=>{
      return song.id !== deletedSong.id;
    });
    setQueue(newQueue);
  }
  */
  return (
    <>
        <h1 className="title">Final Project</h1>
        <SearchBar searchTerm = {searchTerm} sortType = {sortType} setTerm = {setSearchTerm} setType = {setSortType}/>
        <SongResults songs={songs} searchTerm={searchTerm} sortType={sortType} addSong = {addSong}/>
        <div>
          <button onClick = {()=>setMode(currentOneList)}>Back</button>
        </div>
    </>
  );
}

AddPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.object
}

