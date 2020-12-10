/*
  AddPage.js

  Add Page component allows users to add valid Spotify songs to a OneList.
*/

import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar.js';
import TopTracks from '../components/TopTracks.js';

export default function AddPage({setAddMode, OneListID, playlist, SongsAdded, setSongsAdded, user}) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState("track");
  const [addedRecently, setAddedRecently] = useState([]);

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
    const newSongwithId = await response.json();
    setSongsAdded([...SongsAdded, newSongwithId.id]);
    }

  const addSong = (newSong) => {
    if (playlist.find(song => song.songUrl === newSong.songUrl) || 
      addedRecently.find(url => url === newSong.songUrl)){
      alert(`${newSong.title} by ${newSong.artist} has already been added to your OneList!`);
    } else {
      const songwithid = {...newSong, id: undefined, spotify_id:newSong.id, onelist_id:+OneListID, username:user };
      addSongDB(songwithid);
      setAddedRecently([...addedRecently, newSong.songUrl]);
      alert(`${newSong.title} by ${newSong.artist} is now added to your OneList!`);
      console.log(SongsAdded);
    }
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
    OneListID : PropTypes.string.isRequired,
    playlist: PropTypes.array,
    SongsAdded: PropTypes.array,
    setSongsAdded: PropTypes.func,
    user: PropTypes.string
}