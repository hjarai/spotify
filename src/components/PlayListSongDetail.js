import React from 'react';
import PropTypes from 'prop-types';

export default function PlayListSongDetail({songDetails}) {
  return (
    <div>
      //onClick={()=> {songDetails.upvote = songDetails.upvote + 1}}
      //onClick={()=> {songDetails.upvote = songDetails.upvote - 1}
      {songDetails.title} by {songDetails.artist}
      <button>^</button>
      <button}>V</button>
    </div>
  )
}

PlayListSongDetail.propTypes = {
    songDetails : PropTypes.object,
    songDetails.title : PropTypes.string,
    songDetails.artist : PropTypes.string
}
