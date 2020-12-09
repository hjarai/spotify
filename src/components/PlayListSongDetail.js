/* eslint-disable no-constant-condition */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function PlayListSongDetail({songDetails, removeSong, songsAdded, update, setUpdate}) {

  const [upvoteDisable,setUpvoteDisable] = useState();
  const [downvoteDisable,setDownvoteDisable] = useState();
  //need votes as state independent of what is in DB, because updating the DB is asynchronous and not immediate
  const [vote, setVote] = useState(songDetails.vote);

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
    const count = await response.json();
    setUpdate(updatedSong);
  };


  const votefunc = (dir)  => {
    let newvote;
    if (dir==='up'){
      if (downvoteDisable) {
        newvote = vote+2;
      } else {
        newvote = vote+1;
      }
      setUpvoteDisable(true);
      setDownvoteDisable(false);
    } else {
      if (upvoteDisable) {
        newvote = vote-2;
      } else {
        newvote = vote-1;
      }
      setDownvoteDisable(true);
      setUpvoteDisable(false);
    }
    updateSong({...songDetails, vote: newvote});
    setVote(newvote);
   };

  
  return (
    <div className="ButtonsSongDetail">
      {songDetails.title} by {songDetails.artist} added by {songDetails.username}
      <button className="VoteButton" onClick={()=>votefunc('up')} disabled = {upvoteDisable===true}>⬆</button>
        {vote}  
      <button  className="VoteButton" onClick={()=> votefunc('down')} disabled = {downvoteDisable===true}>⬇</button>
      {removeButton}
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object,
    removeSong: PropTypes.func,
    songsAdded: PropTypes.array
}
