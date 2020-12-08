/* eslint-disable no-constant-condition */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function PlayListSongDetail({songDetails, setSongDetails, removeSong, songsAdded}) {

  const [upvoteDisable,setUpvoteDisable] = useState();
  const [downvoteDisable,setDownvoteDisable] = useState();

  const removeButton = (songsAdded.find(id => id === songDetails.id))?
    <button className= "removeSongButton" onClick = {() => {removeSong(songDetails.id)}}> Remove </button>
    : <></>;

  return (
    <div className="ButtonsSongDetail">
      {songDetails.title} by {songDetails.artist} added by {songDetails.username}
      <button className="VoteButton" onClick={()=> {
          if (upvoteDisable === undefined) {
            setSongDetails([songDetails.id, 1, 0]);
          } else {
            setSongDetails([songDetails.id, 1, 1]);
          }
          
          setUpvoteDisable(true);
          setDownvoteDisable(false);
        }} 
          disabled = {upvoteDisable === undefined ? false: upvoteDisable}> ⬆ {songDetails.up}</button>
     
      <button  className="VoteButton" onClick={()=> {
        if (downvoteDisable === undefined) {
          setSongDetails([songDetails.id, 0, -1]);
        } else {
          setSongDetails([songDetails.id, -1, -1]);
        }
        setDownvoteDisable(true);
        setUpvoteDisable(false);
      }}
      
        disabled = {downvoteDisable === undefined ? false : downvoteDisable}> ⬇ {songDetails.down}</button>

       {removeButton}
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object,
    setSongDetails: PropTypes.func,
    removeSong: PropTypes.func
}
