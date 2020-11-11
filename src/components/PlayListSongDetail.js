import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function PlayListSongDetail({songDetails,setSongDetails}) {
const [upvoteDisable,setUpvoteDisable] = useState();
const [downvoteDisable,setDownvoteDisable] = useState();

  return (
    <div>
      {songDetails.title} by {songDetails.artist}
      <button onClick={()=> {
          if (upvoteDisable === undefined) {
            setSongDetails([songDetails.id, 1, 0]);
          } else {
            setSongDetails([songDetails.id, 1, 1]);
          }
          
          setUpvoteDisable(true);
          setDownvoteDisable(false);
        }} 
          disabled = {upvoteDisable === undefined ? false: upvoteDisable}>⬆{songDetails.upvote}</button>
      <button onClick={()=> {
        if (downvoteDisable === undefined) {
          setSongDetails([songDetails.id, 0, -1]);
        } else {
          setSongDetails([songDetails.id, -1, -1]);
        }
        setDownvoteDisable(true);
        setUpvoteDisable(false);
      }}
      
        disabled = {downvoteDisable === undefined ? false : downvoteDisable}>⬇{songDetails.downvote}</button>
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object
}
