
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
import onelistData from '../../data/onelists.json';

import SongResults from '../components/SongResults.js';

import Queue from '../components/Queue.js';
import AttendeeSignInPage from '../components/AttendeeSignInPage.js';

export default function Home() {
  const [view, setView] = useState('home');
  const [oneList, setOneList] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [songs] = useState(data);
  const [queue,setQueue] = useState([]);
  const [user, setUser] = useState();

  const setMode = (param) => {
    //need another if statement to transition from home component to creation page
    if (param === undefined) {
      setView('home')
      }
    else if (param === 'AddPage') {
      setView('AddPage');
    }
    else if (typeof param === 'string') {
      //const serverdata = fetch OneList corresponsing with param from server
      //setOneList(serverdata)
      const saved = onelistData.find(element=>element.id===param);
      setOneList(saved);
      setView('OneList');
    }
    else {
      setOneList(param);
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
  
  const pageContent = (view === 'createOneList')? <CreationPage setMode = {setMode}/>
    :(view === 'attendeeSignIn')? <AttendeeSignInPage setMode = {setMode} user={user} setUser={setUser}/>
    :(view === 'OneList')? <PlaylistPage setMode = {setMode} OneList = {oneList} setSongDetails={setSongDetails} user={user}/>
    :(view === 'AddPage')? <AddPage setMode = {setMode} OneList={oneList} user={user}/>
    :<div> 
      <h1 className="title">Welcome to OneList</h1>
      <div>
        <button className="CreateOneListButton" onClick = {() => {setView('createOneList')}}>Create OneList</button> 
      </div>
      <div>
        <button className="JoinOneListButton" onClick = {() => {setView('attendeeSignIn')}}>Join OneList</button> 
      </div>
    </div>

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
