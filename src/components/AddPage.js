import { useState } from 'react';

import Head from 'next/head';

import styles from '../styles/Home.module.css';

import SearchBar from '../components/SearchBar.js';

import data from '../../data/songs.json';

import SongResults from '../components/SongResults.js';

import Queue from '../components/Queue.js';

export default function AddPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [songs] = useState(data);
  const [queue,setQueue] = useState([]);

  const addSong = (newSong) => {
    const newQueue = [...queue];
    newQueue.push(newSong);
    setQueue(newQueue);
  };

  const deleteSong = (deletedSong) => {
    const newQueue = queue.filter((song)=>{
      return song.id !== deletedSong.id;
    });
    setQueue(newQueue);
  }

  return (
    <>
        <h1 className="title">Final Project</h1>
        <SearchBar searchTerm = {searchTerm} sortType = {sortType} setTerm = {setSearchTerm} setType = {setSortType}/>
        <SongResults songs={songs} searchTerm={searchTerm} sortType={sortType} addSong = {addSong}/>
        <Queue queue={queue} deleteSong = {deleteSong}/>
        <div>
          <button>Add All</button>
          <button>Back</button>
        </div>
    </>
  );
}
