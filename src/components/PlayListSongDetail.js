import React from 'react';

export default function PlayListSongDetail({songDetails}) {
  return (
    <div>
      {songDetails.title} by {songDetails.artist}
      <button onClick={()=> {songDetails.upvote = songDetails.upvote + 1}}>^</button>
      <button onClick={()=> {songDetails.upvote = songDetails.upvote - 1}}>V</button>
    </div>
  )
}