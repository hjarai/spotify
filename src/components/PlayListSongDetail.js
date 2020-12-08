/* eslint-disable no-constant-condition */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function PlayListSongDetail({songDetails, setSongDetails, removeSong, songsAdded}) {

  const [upvoteDisable,setUpvoteDisable] = useState();
  const [downvoteDisable,setDownvoteDisable] = useState();
  const [up, setUp] = useState(+songDetails.up);
  const [down, setDown] = useState(+songDetails.down);
  
  const removeButton = (songsAdded.find(id => id === songDetails.id))?
    <button className= "removeSongButton" onClick = {() => {removeSong(songDetails.id)}}> Remove </button>
    : <></>;

  const updateSong = async ( updatedSong ) => {
    const response = await fetch(
      `api/songs/${updatedSong.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedSong),
        headers: new Headers({ 'Content-type': 'application/json' }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(updatedSong)
  };

  const votefunc = (dir)  => {
    if (dir==='up'){
      if (upvoteDisable===undefined) {
        setUp(1+up);
      } else {
        setUp(1+up);
        setDown(down-1);
      }
      updateSong({...songDetails, up: up, down: down, uri:''});
      setUpvoteDisable(true);
      setDownvoteDisable(false);
    } else {
      if (downvoteDisable===undefined) {
        setDown(1+down);
      } else {
        setUp(up-1);
        setDown(1+down);
      }
      updateSong({...songDetails, up: up, down: down, uri:''});
      setDownvoteDisable(true);
      setUpvoteDisable(false);
      }
   }

  
  return (
    <div className="ButtonsSongDetail">
      {songDetails.title} by {songDetails.artist} added by {songDetails.username}
      <button className="VoteButton" onClick={()=>votefunc('up')} disabled = {upvoteDisable===true}> ⬆ {up}  </button>
      <button  className="VoteButton" onClick={()=> votefunc('down')} disabled = {downvoteDisable===true}> ⬇ {down} </button>

      {removeButton}
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object,
    setSongDetails: PropTypes.func,
    removeSong: PropTypes.func,
    songsAdded: PropTypes.array
}
