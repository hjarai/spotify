import React from 'react';

export default function SongDetail(details,deleteSong) {
  console.log(details);
  return (
    <div>
      {details.details.title} by {details.details.artist}
      <button onClick={()=> {details.deleteSong(details.details)}}>-</button>
    </div>
  )
}