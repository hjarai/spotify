import React from 'react';

export default function SearchSongDetail(details, addSong) {
  return (
    <div>
      {details.details.title} by {details.details.artist}
      <button onClick={()=> {details.addSong(details.details)}}>+</button>
    </div>
  )
}