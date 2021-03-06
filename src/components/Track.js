/*
  Track.js

  Component that handles changes (ie. added) for each song in the top Spotify search 
  results of AddPage. 
*/

import React from 'react';
import PropTypes from 'prop-types';

export default function Track({track, addSong}) {
  const ignore = false;
  if (ignore){
    addSong();
  }
  return (
    <div className="ResultSearch">
      {track.title} by {track.artist}
      <button className="PlusButton" onClick={()=> {addSong(track)}}>+</button>
    </div>
  )
}

Track.propTypes = {
  track : PropTypes.object,
  addSong : PropTypes.func
}