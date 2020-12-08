import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Track from './Track'
<<<<<<< HEAD
import PropTypes from 'prop-types';
=======
//import PropTypes from 'prop-types';
>>>>>>> f5ca8625faf4d48991c9548e2a5601c4036c1330
//import {getAccessToken, getSearch} from '../lib/spotify.js';

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
      track.upvote = 0,
      track.downvote = 0,
      <Track key={track.songUrl} track = {track} addSong = {addSong}/>
    ));
  }

<<<<<<< HEAD
  return data.map((track) => (
    track.upvote = 0,
    track.downvote = 0,
    <Track key={track.songUrl} track = {track} addSong = {addSong}/>
  ));
};

export default TopTracks;
TopTracks.propTypes = {
  searchTerm : PropTypes.string,
  addSong : PropTypes.func
=======
  
>>>>>>> f5ca8625faf4d48991c9548e2a5601c4036c1330
}