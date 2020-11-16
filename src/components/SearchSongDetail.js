import React from 'react';
import PropTypes from 'prop-types';

export default function SearchSongDetail({details, addSong, user}) {
  //console.log('DETAILS');
  //console.log(details);
  const ignore = false;
  if (ignore){
    addSong();
  }
  return (
    <div>
      {details.title} by {details.artist}
      <button onClick={()=> {addSong(details, user)}}>+</button>
    </div>
  )
}

SearchSongDetail.propTypes = {
    details : PropTypes.object,
    addSong : PropTypes.func,
    user: PropTypes.string
}
