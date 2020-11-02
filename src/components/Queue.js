import React from 'react';

import SongDetail from './SongDetail';
import PropTypes from 'prop-types';

export default function Queue ({queue,deleteSong}) {
  const songList = queue.map((song) => (
    <SongDetail key = {song.id} details = {song} deleteSong = {deleteSong} />
  ));


  return (
    <div> QUEUE: {songList} </div>
  )
}

Queue.propTypes = {
  queue: PropTypes.array.isRequired,
  deleteSong: PropTypes.func.isRequired,
};