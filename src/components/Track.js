import React from 'react';
import PropTypes from 'prop-types';

export default function Track({track, addSong}) {
  const ignore = false;
  if (ignore){
    addSong();
  }
  return (
    <div>
      {track.title} by {track.artist}
      <button onClick={()=> {addSong(track)}}>+</button>
    </div>
  )
}

Track.propTypes = {
  details : PropTypes.object,
  addSong : PropTypes.func
}