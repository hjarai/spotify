import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Track from './Track'
//import PropTypes from 'prop-types';
//import {getAccessToken, getSearch} from '../lib/spotify.js';

export default function TopTracks ({ searchTerm, addSong }) {
  if (searchTerm==='') {
    return null;
  }

  const result  =  useSWR(`/api/${searchTerm}`, fetcher);
  const { data }= result;
  if (!data) {
    return null;
  }

  return data.map((track) => (
    track.upvote = 0,
    track.downvote = 0,
    <Track key={track.songUrl} track = {track} addSong = {addSong}/>
  ));
}