import React from 'react';

import SongDetail from './SongDetail';

export default function Queue ({queue,deleteSong}) {
  let songList = queue.map((song) => (
    <SongDetail key = {song.title} details = {song} deleteSong = {deleteSong} />
  ));


  return (
    <div> QUEUE: {songList} </div>
  )
}