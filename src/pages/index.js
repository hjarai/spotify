
/* eslint-disable no-undef, no-unused-vars */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CreationPage from '../components/CreationPage.js'
import AddPage from '../components/AddPage.js'
import PlaylistPage from '../components/PlaylistPage.js';
import Login from '../components/login.js'

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
    else if (OneList === 'AddPage') {
      setView('AddPage');
    }
    else {
      setOneList(OneList);
      setView('OneList');    
    }
  };

  const setSongDetails = (voteA) => {
    const currentPlaylist = oneList.playlist.map((song) => 
      {
        if (song.id===voteA[0]){
          song.upvote += voteA[1];
          song.downvote += voteA[2];
          return song;
        }
        else{
          return song;
        } 
      }
    );
    const currentOneList = {...oneList};
    currentOneList.playlist = currentPlaylist;
    currentOneList.playlist = currentOneList.playlist.sort((song1,song2)=>{
      const song1sum = (song1.upvote) + (song1.downvote);
      const song2sum = (song2.upvote) + (song2.downvote);
      if (song1sum > song2sum){
        return -1;
      }
      else if (song1sum === song2sum){
        return 0;
      }
      else{
        return 1;
      }
    })
    setOneList(currentOneList);
  }
  console.log();
  
  
  let pageContent;

  if (view === 'createOneList') {
    pageContent = (<CreationPage setMode = {setMode}/>);

  }  else if (view === 'OneList') {
    pageContent = (<PlaylistPage setMode = {setMode} OneList = {oneList} setSongDetails = {setSongDetails}/>)

  } else if (view === 'AddPage'){

    pageContent = (<AddPage setMode = {setMode} OneList={oneList}/>);
  } else {

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
      <div>
      {pageContent}
      </div>
      <div>
        <Login Host Login/>
      </div>
        
      </main>
      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
