/* eslint-disable no-constant-condition */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';


export default function PlayListSongDetail({songDetails, setSongDetails, removeSong}) {


  const [upvoteDisable,setUpvoteDisable] = useState();
  const [downvoteDisable,setDownvoteDisable] = useState();

  let removeButton;
 
  if( true /*if(songsAdded.contains(song)*/){ //songs added can be a state that holds a list of songs added by the user
    removeButton = <button className="removeSongButton" onClick = {() => {removeSong(songDetails.title)}}> Remove </button>
  } else {
    removeButton = <> </>
  }

  return (
    <div>
      {songDetails.title} by {songDetails.artist} <i>  added by {songDetails.user}</i>
      <button onClick={()=> {
          if (upvoteDisable === undefined) {
            setSongDetails([songDetails.id, 1, 0]);
          } else {
            setSongDetails([songDetails.id, 1, 1]);
          }
          
          setUpvoteDisable(true);
          setDownvoteDisable(false);
        }} 
          disabled = {upvoteDisable === undefined ? false: upvoteDisable}> ⬆ {songDetails.upvote}</button>
     
      <button onClick={()=> {
        if (downvoteDisable === undefined) {
          setSongDetails([songDetails.id, 0, -1]);
        } else {
          setSongDetails([songDetails.id, -1, -1]);
        }
        setDownvoteDisable(true);
        setUpvoteDisable(false);
      }}
      
        disabled = {downvoteDisable === undefined ? false : downvoteDisable}> ⬇ {songDetails.downvote}</button>

       {removeButton}
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object,
    setSongDetails: PropTypes.func,
    removeSong: PropTypes.func
}
