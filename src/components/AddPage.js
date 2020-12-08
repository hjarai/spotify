import { useState } from 'react';

import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar.js';

import TopTracks from '../components/TopTracks.js';

export default function AddPage({setAddMode, OneListID, playlist, SongsAdded, setSongsAdded, user}) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState("track");
  const [addedRecently, setAddedRecently] = useState([]);
// const currentOneList = {...OneList}; 

/*   const addSong = (newSong) => {
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
  }; */

  const addSong = (newSong) => {
    if (playlist.find(song => song.songUrl === newSong.songUrl) || 
      addedRecently.find(url => url === newSong.songUrl)){
      alert(`${newSong.title} by ${newSong.artist} has already been added to your OneList!`);
    } else {
      const songwithid = {...newSong, id: undefined, spotify_id:newSong.id, onelist_id:+OneListID, username:user };
      addSongDB(songwithid);
      setAddedRecently([...addedRecently, newSong.songUrl]);
      alert(`${newSong.title} by ${newSong.artist} is now added to your OneList!`);
      //console.log(addedRecently);
    }
  }

  const addSongDB = async (newSong) => {
    const response = await fetch(`/api/songs`,{
      method:'POST',
      body: JSON.stringify(newSong),
      headers: new Headers({'Content-type': 'application/json'}),
      });
    //error handling 
    if(!response.ok){
      throw new Error(response.statusText);
      }
    const newSongId = await response.json();
    setSongsAdded([...SongsAdded, newSongId]);
    }

  return (
    <>
        <h1 className="title">Search Spotify: </h1>
        <SearchBar searchTerm = {searchTerm} sortType = {sortType} setTerm = {setSearchTerm} setType = {setSortType}/>
        <TopTracks searchTerm = {searchTerm} addSong = {addSong} sortType={sortType}/>
        <div>
          <button className = "backButton" onClick = {()=>setAddMode(false)}>Back</button>
        </div>
    </>
  );
}

AddPage.propTypes = {
    setAddMode : PropTypes.func,
    OneListID : PropTypes.string.isRequired
}

//<SongResults songs={songs} searchTerm={searchTerm} sortType={sortType} addSong = {addSong}/>