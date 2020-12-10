/*
  TopTracks.js

  Component that allows users to search songs available in Spotify by track 
  title or by artist. 
*/

import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Track from './Track'
import PropTypes from 'prop-types';

export default function TopTracks ({ searchTerm, addSong, sortType}) {
  if (searchTerm==='') {
    return null;
  }
  let result;
  if (sortType==="track") {
    result = useSWR(`/api/trackSearch/${searchTerm}`, fetcher);
  } else {
    result = useSWR(`/api/artistSearch/${searchTerm}`, fetcher);
  }
  
  const { data }= result;
  if (!data || data.length===0) {
    if (!data) {
      return <div> Searching. . . </div>
    } else{
      return <div> No Results Found </div>
    }  
  } else { 
    return data.map((track) => (
      track.vote = 0,
      <Track key={track.songUrl} track = {track} addSong = {addSong}/>
    ));
  }
}

TopTracks.propTypes = {
  searchTerm: PropTypes.string,
  addSong: PropTypes.func,
  sortType: PropTypes.string
}