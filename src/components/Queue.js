import React from 'react';

import SongDetail from './SongDetail';

export default function Queue ({queue,deleteSong}) {
  console.log(queue);
  let songList = queue.map((song) => (
    <SongDetail key = {song.id} details = {song} deleteSong = {deleteSong} />
  ));


  return (
    <div> QUEUE: {songList}</div>
  )
}