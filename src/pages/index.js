
/* eslint-disable no-undef, no-unused-vars */
import Head from 'next/head';
import { useState } from 'react';
import CreationPage from '../components/CreationPage.js'
import styles from '../styles/Home.module.css';

import SearchBar from '../components/SearchBar.js';

import data from '../../data/songs.json';

import SongResults from '../components/SongResults.js';

import Queue from '../components/Queue.js';

export default function Home() {
  const [view, setView] = useState('home');
  const [oneList, setOneList] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [songs] = useState(data);
  const [queue,setQueue] = useState([]);

  const setMode = (OneList) => {
    //need another if statement to transition from home component to creation page
    if (OneList === undefined) {
      setView('home')
      }
    else {
      setView('OneList'); 
      setOneList(OneList);
        }
    };
  
  let pageContent;

  if (view === 'createOneList') {
    pageContent = (<CreationPage setMode = {setMode}/>);

  }  else if (view === 'OneList'){
  
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
    
    pageContent = (
      <>
          <h1 className="title">Final Project</h1>
          <SearchBar searchTerm = {searchTerm} sortType = {sortType} setTerm = {setSearchTerm} setType = {setSortType}/>
          <SongResults songs={songs} searchTerm={searchTerm} sortType={sortType} addSong = {addSong}/>
          <Queue queue={queue} deleteSong = {deleteSong}/>
          <div>
            <button>Add All</button>
            <button>Back</button>
          </div>
      </>);
    }else {

    pageContent = (<>
      <h1 className="title">Welcome to OneList</h1>
      <button className="CreateOneListButton" onClick = {() => {setView('createOneList')}}>Create OneList</button> </>)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome Page</title>
      </Head>
      <main>
        {pageContent}
      </main>
      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
